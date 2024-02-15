import { videoItem } from '../components/playListComType'

export interface weatherItem{
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

export interface locationInfo {
  latitude : number,
  longitude : number
}

