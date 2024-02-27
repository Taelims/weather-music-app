import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: localStorage,
});

export const userAtom = atom({
  key: 'userAtom',
  default: {
    id: '' ,
    playList: []
  },
  effects_UNSTABLE: [persistAtom],
});