import type { IpcRenderer } from "electron";
import type { GitHubIssue, Result } from "@/shared/types";

interface GitHubApi {
  getIssues: (args: {
    owner: string;
    repo: string;
    token: string;
    state?: "open" | "closed" | "all";
  }) => Promise<Result<GitHubIssue[], { message: string; statusCode: number }>>;
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
