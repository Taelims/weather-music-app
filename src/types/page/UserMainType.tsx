import { VideoItemType } from '../components/PlayListComType'
import { WeatherType } from '../components/WeatherComType'

export interface WeatherQueryType {
  isLoading: boolean,
  isError: boolean,
  data: WeatherType
}

export interface WeatherVideoQueryType {
  isLoading: boolean,
  isError: boolean,
  data?: VideoItemType[]
}

export type LocationType =  {
  latitude : number,
  longitude : number
}

export interface GeoLocationType {
  error : string,
  location? : LocationType
}

export interface SignInUp{
  createAccout : {
    id: string
    password: string
  }
  login : {
    id: string
    password: string
  }
}

