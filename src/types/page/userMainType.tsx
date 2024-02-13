export interface weatherQuery {
  isLoading: boolean,
  isError: boolean,
  data: {
    temp: number
    weather: string
  }
}

export interface weatherVideoQuery {
  isLoading: boolean,
  isError: boolean,
  data: {
    item: {
      videoId: string
      title: string
      url: string
    }[]
  }
}

export interface locationInfo {
  latitude : number,
  longitude : number
}

