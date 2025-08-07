import { IpcChannels } from "@/shared/constants";
import { ipcMain } from "electron";
import type { GitHubService } from "../services";

export function registerGitHubApiHandlers(githubService: GitHubService): void {
  ipcMain.handle(IpcChannels.GITHUB_GET_ISSUES, async (_, args) => {
    const { owner, repo, token, state } = args;
    return githubService.getIssues({ owner, repo, token, state });
  });
}
