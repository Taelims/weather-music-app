import { atom } from 'recoil'

export const modalShowAtom = atom<boolean>({
  key: 'modalShow',
  default: false
});