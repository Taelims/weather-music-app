import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: localStorage,
});

export const userState = atom({
  key: 'userState',
  default: {
    id: '' ,
    playList: []
  },
  effects_UNSTABLE: [persistAtom],
});