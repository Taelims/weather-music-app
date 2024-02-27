import { atom } from 'recoil'

export type BoardInfo = {
  id: string;
  title: string;
  text: string;
  comment?: string[];
  views?: number;
  addDate: string;
};


export const boardListAtom = atom<BoardInfo[]>({
  key: 'boardList',
  default: [
    {
      addDate: '',
      comment: [],
      id: '',
      text: '',
      title: '',
      views: 0,
    }
  ]
});