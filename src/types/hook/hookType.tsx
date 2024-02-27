import { videoItem } from '../components/playListComType'

export interface VideoQuery {
  isLoading : boolean,
  isError : boolean,
  data?: videoItem[]
}

export type BoardInfo = {
  id: string,
  title : string,
  text : string
  comment?: string[]
  views?: number,
  addDate: string,
}

export interface BoardQuery {
  isLoading : boolean,
  isError : boolean,
  data?: BoardInfo[]
}