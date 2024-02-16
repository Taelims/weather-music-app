import { videoItem } from '../components/playListComType'

export type weatherItem = {
  weather: string
  temp: number
}

export interface weatherQuery {
  isLoading: boolean,
  isError: boolean,
  data: weatherItem
}

export interface weatherVideoQuery {
  isLoading: boolean,
  isError: boolean,
  data?: videoItem[]
}

export type locationInfo =  {
  latitude : number,
  longitude : number
}

