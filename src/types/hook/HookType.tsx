import { VideoItemType } from '../components/PlayListComType'

export interface VideoQueryType {
  isLoading : boolean,
  isError : boolean,
  data?: VideoItemType[]
}

export type BoardItemType = {
  id: string,
  title : string,
  text : string
  comment?: string[]
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