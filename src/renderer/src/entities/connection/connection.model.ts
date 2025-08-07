import { atomWithStorage } from "jotai/utils";

export interface Connection {
  id: string;
  owner: string;
  repo: string;
  token: string;
}

export const connectionsAtom = atomWithStorage<Connection[]>("connections", []);
