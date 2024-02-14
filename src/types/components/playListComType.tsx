export interface videoItem {
  videoId: string
  title: string
  url: string
}

export interface playListComProps {
  width: number;
  height: number;
  key?: number
  idx : number
  data : {
    item: videoItem[]
  }
}

export interface categoryVideoQuery {
  isLoading : boolean,
  isError : boolean,
  data : {
    item: videoItem[]
  }
}