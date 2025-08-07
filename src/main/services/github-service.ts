import type { GitHubIssue, Result } from "@/shared/types";
import { err, ok } from "@/shared/types";

const GITHUB_API_URL = "https://api.github.com";

interface GetIssuesParams {
  owner: string;
  repo: string;
  token: string;
  state?: "open" | "closed" | "all";
}

interface ApiError {
  message: string;
  statusCode: number;
}

export class GitHubService {
  public async getIssues(params: GetIssuesParams): Promise<Result<GitHubIssue[], ApiError>> {
    const { owner, repo, token, state } = params;
    const url = new URL(`${GITHUB_API_URL}/repos/${owner}/${repo}/issues`);
    if (state) {
      url.searchParams.append("state", state);
    }

    try {
      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url.toString(), { headers });

      if (!response.ok) {
        const errorBody = await response.json();
        return err({
          message: errorBody.message || "Failed to fetch issues",
          statusCode: response.status,
        });
      }

      const data: GitHubIssue[] = await response.json();
      const issuesOnly = data.filter((issue) => issue.pull_request === undefined);

      return ok(issuesOnly);
    } catch (error) {
      return err({
        message: error instanceof Error ? error.message : "An unknown network error occurred",
        statusCode: 500,
      });
    }
  }
}
