import { IResolvers } from 'mercurius';

export const resolvers: IResolvers = {
  Query: {
    async health(root, args, { dataClient }, info) {
      return dataClient.meta.health();
    },
  },
};
