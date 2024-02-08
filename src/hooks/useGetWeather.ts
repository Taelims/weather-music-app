import { useQuery } from 'react-query'
import { useGeoLocation } from './useGeoLocation'
import axios from 'axios'


const fetchWeather = async (location : any) => {
  if(location){
    const weatherRes = await axios.get("api/v1/user/media/weather", {
      params: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    })
    return weatherRes.data.result
  }
}

export const useGetWeather = () => {
  const geolocationOptions = {
    enableHighAccuracy: false,
    timeout: 180000,
    maximumAge: 7000,
  }
  const { location, error } = useGeoLocation(geolocationOptions);

  const { isLoading, isError, data } = useQuery(
    "weather", ()=>fetchWeather(location), {
      enabled: !!location
    }
  )
  return { isLoading, isError, data }
}