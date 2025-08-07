import { atom } from "jotai";
import { loadable } from "jotai/utils";

import { activeConnectionAtom } from "@renderer/entities/connection";

const issuesBaseAtom = atom(async (get) => {
  const activeConnection = get(activeConnectionAtom);
  if (!activeConnection) {
    return [];
  }

  const { owner, repo, token } = activeConnection;
  const result = await window.github.getIssues({ owner, repo, token, state: "all" });

  if (result.isOk) {
    return result.value;
  }

  throw result.error;
});

export const issuesAtom = loadable(issuesBaseAtom);
