import { useQuery } from 'react-query'
import { useGeoLocation } from './useGeoLocation'
import icAxios from '../util/icAxios'
import { GeoLocationType, LocationType, WeatherQueryType } from '../types/page/UserMainType'
import Swal from 'sweetalert2'
import { WeatherType } from '../types/components/WeatherComType'


const fetchWeather = async (location : LocationType) => {
  let apiKey: string = process.env.REACT_APP_WEATHER_KEY!
  let url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`

  const weatherRes = await icAxios.get(url)
  let data: WeatherType = {
    weather: weatherRes.data.weather[0].main,
    temp: Math.floor(weatherRes.data.main.temp - 273.15)
  };
  return data
}

export const useGetWeather = () => {
  const geolocationOptions = {
    enableHighAccuracy: false,
    timeout: 180000,
    maximumAge: 7000,
  }
  const { location, error }: GeoLocationType = useGeoLocation(geolocationOptions);

  if(error){
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '위치정보 오류',
      text: error,
    })
  }

  const { isLoading, isError, data } = useQuery(
    "weather", ()=>fetchWeather(location!), {
      enabled: !!location
    }
  ) as WeatherQueryType
  return { isLoading, isError, data }
}