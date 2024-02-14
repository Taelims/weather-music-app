export interface playListComProps {
  width: number;
  height: number;
  key?: number
  idx : number
  data : {
    item: {
      videoId: string
      title: string
      url: string
    }[]
  }
}

export interface categoryVideoQuery {
  isLoading : boolean,
  isError : boolean,
  data : {
    item: {
      videoId: string
      title: string
      url: string
    }[]
  }
}