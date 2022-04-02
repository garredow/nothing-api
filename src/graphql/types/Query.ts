import { gql } from 'mercurius-codegen';

export const Query = gql`
  type Query {
    projects: [Project!]!
    health: Health!
  }
`;
