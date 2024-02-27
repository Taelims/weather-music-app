import { atom } from 'recoil'

export const boardModalNameAtom = atom<string>({
  key: 'boardModalName',
  default: ''
});