import { gql } from 'mercurius-codegen';

export const Project = gql`
  type Project {
    id: Int!
    slug: String!
    name: String!
    description: String!
    github_id: String!
    circleci_id: String
    icon_url: String
    created_at: DateTime!
    updated_at: DateTime!
  }
`;
