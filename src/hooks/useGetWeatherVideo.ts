import { useQuery, useQueryClient } from 'react-query'
import icAxios from '../util/icAxios'
import { weatherInfo } from '../types/components/weatherComType'


const fetchVideo = async (weatherData : weatherInfo)=> {
  let keyword = weatherData?.weather
  keyword = keyword === 'Clear' ? '맑은 날씨 음악' : '흐린 날씨 음악';
  const playListRes = await icAxios.get("api/v1/user/media/video", {
    params: {
      keyword: keyword,
    }
  })
  return playListRes.data.result
}


export const useGetWeatherVideo = () => {
  const queryClient = useQueryClient();
  const weatherData : weatherInfo = queryClient.getQueryData('weather')!;

  const { isLoading, isError, data } = useQuery(
    "weatherVideo", () => fetchVideo(weatherData), {
      enabled: !!weatherData
    }
  )
  return { isLoading, isError, data }
}