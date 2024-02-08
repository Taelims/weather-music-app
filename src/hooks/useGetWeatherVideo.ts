import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'


const fetchVideo = async (weatherData : any)=> {
  let keyword = weatherData.weather
  keyword = keyword === 'Clear' ? '맑은 날씨 음악' : '흐린 날씨 음악';
  const playListRes = await axios.get("api/v1/user/media/video", {
    params: {
      keyword: keyword,
    }
  })
  return playListRes.data.result
}


export const useGetWeatherVideo = () => {
  const queryClient = useQueryClient();
  const weatherData : any = queryClient.getQueryData('weather');

  const { isLoading, isError, data } = useQuery(
    "weatherVideo", () => fetchVideo(weatherData), {
      enabled: !!weatherData
    }
  )
  return { isLoading, isError, data }
}