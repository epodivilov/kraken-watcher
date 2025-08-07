import type { IpcRenderer } from "electron";
import type { GetIssuesResult, GitHubIssue, Result } from "@/shared/types";

interface GetIssuesParams {
  owner: string;
  repo: string;
  token: string;
  page: number;
  state?: "open" | "closed" | "all";
}

interface GitHubApi {
  getIssues: (
    args: GetIssuesParams,
  ) => Promise<Result<GetIssuesResult, { message: string; statusCode: number }>>;
}

interface SafeIpcRenderer {
  on: IpcRenderer["on"];
  removeListener: IpcRenderer["removeListener"];
  invoke: IpcRenderer["invoke"];
}

interface ElectronApi {
  ipcRenderer: SafeIpcRenderer;
}

declare global {
  interface Window {
    electron: ElectronApi;
    github: GitHubApi;
  }
}
