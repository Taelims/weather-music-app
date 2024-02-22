export type videoItem = {
  videoId: string
  title: string
  url: string
}

export interface playListComProps {
  width: number;
  height: number;
  key?: number
  idx : number
  data?: videoItem[]
}