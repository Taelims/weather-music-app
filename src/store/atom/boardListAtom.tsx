import { atom } from 'recoil'
import { BoardItemType } from '../../types/hook/HookType'


export const boardListAtom = atom<BoardItemType[]>({
  key: 'boardList',
  default: [
    {
      addDate: '',
      commentList: [],
      id: '',
      text: '',
      title: '',
      views: 0,
    }
  ]
});