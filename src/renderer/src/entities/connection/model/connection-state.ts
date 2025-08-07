import { atom } from 'jotai'

export const isConnectedAtom = atom(false)

export const connectionStatusAtom = atom((get) => get(isConnectedAtom))

