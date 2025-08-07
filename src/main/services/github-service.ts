import type { GitHubIssue, GetIssuesResult, Result } from "@/shared/types";
import { err, ok } from "@/shared/types";

const GITHUB_API_URL = "https://api.github.com";
const ISSUES_PER_PAGE = 10;

interface GetIssuesParams {
  owner: string;
  repo: string;
  token: string;
  page: number;
  state?: "open" | "closed" | "all";
}

interface ApiError {
  message: string;
  statusCode: number;
}

interface GitHubSearchApiResult {
  total_count: number;
  items: GitHubIssue[];
}

export class GitHubService {
  public async getIssues(params: GetIssuesParams): Promise<Result<GetIssuesResult, ApiError>> {
    const { owner, repo, token, state, page } = params;
    const url = new URL(`${GITHUB_API_URL}/search/issues`);

    const queryParts = [`repo:${owner}/${repo}`, "is:issue"];
    if (state && state !== "all") {
      queryParts.push(`state:${state}`);
    }

    url.searchParams.append("q", queryParts.join(" "));
    url.searchParams.append("page", page.toString());
    url.searchParams.append("per_page", ISSUES_PER_PAGE.toString());

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

      const data: GitHubSearchApiResult = await response.json();
      const hasNextPage = page * ISSUES_PER_PAGE < data.total_count;

      return ok({ issues: data.items, hasNextPage });
    } catch (error) {
      return err({
        message: error instanceof Error ? error.message : "An unknown network error occurred",
        statusCode: 500,
      });
    }
  }
}
