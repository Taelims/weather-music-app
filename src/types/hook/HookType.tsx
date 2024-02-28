import { VideoItemType } from '../components/PlayListComType'
import { comment } from '../components/BoardDetailModalComType'

export interface VideoQueryType {
  isLoading : boolean,
  isError : boolean,
  data?: VideoItemType[]
}

export interface BoardItemType {
  id: string,
  title : string,
  text : string
  commentList?: comment[]
  views?: number,
  addDate: string,
}

export interface BoardQueryType {
  isLoading : boolean,
  isError : boolean,
  data?: BoardItemType[]
}

export interface LoginRes {
  data: {
    token:string
  }
}