import knex from 'knex';
import pg from 'pg';
import { config } from '../lib/config';
import { Project } from '../models';

pg.types.setTypeParser(pg.types.builtins.INT8, (value: string) => {
  return parseInt(value);
});

enum Table {
  Project = 'project',
}

export class Database {
  private db;

  constructor() {
    this.db = knex({
      client: 'pg',
      connection: {
        application_name: config.meta.appName,
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        ssl: config.database.ssl
          ? {
              rejectUnauthorized: false,
            }
          : false,
      },
    });
  }

  project = {
    getById: (id: number): Promise<Project | undefined> => {
      return this.db<Project>(Table.Project).where({ id }).first();
    },
    getByIds: (ids: number[]): Promise<Project[]> => {
      return this.db<Project>(Table.Project).whereIn('id', ids);
    },
    getAll: (): Promise<Project[]> => {
      return this.db<Project>(Table.Project);
    },
  };

  // Health

  meta = {
    testLatency: async () => {
      try {
        const before = Date.now();
        await this.db.raw('SELECT 1');
        return Date.now() - before;
      } catch (err: any) {
        console.error('Failed to connect to the database', err?.message);
        return 0;
      }
    },
  };
}
