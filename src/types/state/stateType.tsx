import { playListItem } from '../page/playListDetailType'

export interface WeatherState {
  temp : number
  weather : string
}

export interface UserState {
  id?: string
  playList?: playListItem[]
}
