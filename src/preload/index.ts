import { IpcChannels } from "@/shared/constants";
import type { GitHubIssue, Result } from "@/shared/types";
import { contextBridge, ipcRenderer } from "electron";

const github = {
  getIssues: (args: {
    owner: string;
    repo: string;
    token: string;
    state?: "open" | "closed" | "all";
  }): Promise<Result<GitHubIssue[], { message: string; statusCode: number }>> =>
    ipcRenderer.invoke(IpcChannels.GITHUB_GET_ISSUES, args),
};

const electron = {
  ipcRenderer: {
    ...ipcRenderer,
    on: ipcRenderer.on.bind(ipcRenderer),
    removeListener: ipcRenderer.removeListener.bind(ipcRenderer),
    invoke: ipcRenderer.invoke.bind(ipcRenderer),
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electron);
    contextBridge.exposeInMainWorld("github", github);
  } catch (error) {
    console.error("Failed to expose APIs via contextBridge:", error);
  }
} else {
  // @ts-ignore (define in d.ts)
  window.electron = electron;
  // @ts-ignore (define in d.ts)
  window.github = github;
}
