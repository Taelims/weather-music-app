export type VideoItemType = {
  videoId: string
  title: string
  url: string
}

export interface PlayListComPropsType {
  width: number;
  height: number;
  key?: number
  idx : number
  data?: VideoItemType[]
}