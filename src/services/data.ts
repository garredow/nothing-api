import { Database } from '../database/db';
import { Health } from '../models';
const { version: apiVersion } = require('../../package.json');

export class Data {
  db: Database;

  constructor(db?: Database) {
    this.db = db ?? new Database();
  }

  meta = {
    health: async (): Promise<Health> => {
      return {
        version: apiVersion,
        uptime: Math.floor(process.uptime() * 1000),
        date: new Date().toUTCString(),
        databaseLatency: await this.db.meta.testLatency(),
      };
    },
  };
}
