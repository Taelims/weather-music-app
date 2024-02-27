import { BoardInfo } from '../hook/hookType'

export interface BoardPropsType {
  item?: BoardInfo
  onHide: () => void;
  boardModalShow: boolean;
  boardModalName: string
}

export interface BoardFormInfo {
  id : string,
  title : string,
  text: string,
  addDate: string,
  comment?: string[]
  newComment?: string,
}

export type loginRes = {
  data : {
    token : string
  }
}