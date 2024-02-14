import { useQuery } from 'react-query'
import { useGeoLocation } from './useGeoLocation'
import icAxios from '../util/icAxios'
import { locationInfo } from '../types/page/userMainType'
import Swal from 'sweetalert2'


const fetchWeather = async (location : locationInfo | undefined) => {
  if(location){
    const weatherRes = await icAxios.get("api/v1/user/media/weather", {
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

  if(error){
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '위치정보 오류',
      text: error,
    })
  }

  const { isLoading, isError, data } = useQuery(
    "weather", ()=>fetchWeather(location), {
      enabled: !!location
    }
  )
  return { isLoading, isError, data }
}