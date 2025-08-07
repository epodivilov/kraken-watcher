import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { nanoid } from 'nanoid';

export interface Connection {
  id: string;
  owner: string;
  repo: string;
  token: string;
}

export const connectionsAtom = atomWithStorage<Connection[]>('connections', []);
export const activeConnectionIdAtom = atomWithStorage<string | null>(
  'activeConnectionId',
  null,
);

export const hasConnectionsAtom = atom((get) => get(connectionsAtom).length > 0);

export const activeConnectionAtom = atom((get) => {
  const connections = get(connectionsAtom);
  const activeId = get(activeConnectionIdAtom);
  return connections.find((c) => c.id === activeId) || null;
});

// Write-only atoms for actions
export const addConnectionAtom = atom(
  null,
  (get, set, { owner, repo, token }: Omit<Connection, 'id'>) => {
    const newConnection = { id: nanoid(), owner, repo, token };
    set(connectionsAtom, [...get(connectionsAtom), newConnection]);
    set(activeConnectionIdAtom, newConnection.id);
  },
);

export const removeConnectionAtom = atom(null, (get, set, id: string) => {
  if (get(activeConnectionIdAtom) === id) {
    set(activeConnectionIdAtom, null);
  }
  set(
    connectionsAtom,
    get(connectionsAtom).filter((c) => c.id !== id),
  );
});
