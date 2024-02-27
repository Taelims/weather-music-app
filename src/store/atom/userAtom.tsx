import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserState } from '../../types/state/stateType'

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: localStorage,
});

export const userAtom = atom<UserState>({
  key: 'userAtom',
  default: {
    id: '' ,
    playList: []
  },
  effects_UNSTABLE: [persistAtom],
});