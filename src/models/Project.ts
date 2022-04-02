export type Project = {
  id: number;
  slug: string;
  name: string;
  description: string;
  github_id: string;
  circleci_id: string;
  icon_url: string;
  created_at: Date;
  updated_at: Date;
};
