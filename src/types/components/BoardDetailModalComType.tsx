import { BoardItemType } from '../hook/HookType'

export interface BoardPropsType {
  item?: BoardItemType
  onHide: () => void;
  boardModalShow: boolean;
  boardModalName: string
}

export interface BoardFormType {
  id : string,
  title : string,
  text: string,
  addDate: string,
  commentList?: comment[]
  newComment?: comment,
}

export type comment = {
  id: string,
  userId?: string,
  content: string,
}