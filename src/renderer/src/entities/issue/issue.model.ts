import { atom } from "jotai";
import { loadable } from "jotai/utils";

import { activeConnectionAtom } from "@renderer/entities/connection";

export const issuesPageAtom = atom(1);

const issuesBaseAtom = atom(async (get) => {
  const activeConnection = get(activeConnectionAtom);
  if (!activeConnection) {
    return { issues: [], hasNextPage: false };
  }

  const page = get(issuesPageAtom);
  const { owner, repo, token } = activeConnection;
  const result = await window.github.getIssues({ owner, repo, token, page, state: "all" });

  if (result.isOk) {
    return result.value;
  }

  throw result.error;
});

export const issuesAtom = loadable(issuesBaseAtom);
