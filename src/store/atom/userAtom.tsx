import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserAtomType } from '../../types/state/AtomType'

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: localStorage,
});

export const userAtom = atom<UserAtomType>({
  key: 'userAtom',
  default: {
    id: '' ,
    playList: []
  },
  effects_UNSTABLE: [persistAtom],
});