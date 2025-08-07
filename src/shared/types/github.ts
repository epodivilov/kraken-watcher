export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: "open" | "closed";
  user: {
    login: string;
    avatar_url: string;
  } | null;
  labels: {
    name: string;
    color: string;
  }[];
  created_at: string;
  updated_at: string;
  pull_request?: unknown;
}

export interface GetIssuesResult {
  issues: GitHubIssue[];
  hasNextPage: boolean;
}
