import { useQuery, useQueryClient } from 'react-query'
import icAxios from '../util/icAxios'
import { weatherInfo } from '../types/components/weatherComType'
import { videoItem } from '../types/components/playListComType'


const fetchVideo = async (weatherData : weatherInfo)=> {
  let keyword = weatherData?.weather
  keyword = keyword === 'Clear' ? '맑은 날씨 음악' : '흐린 날씨 음악';
  let apiKey = process.env.REACT_APP_YOUTUBE_KEY
  let url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${keyword}%20music&videoDuration=medium&type=video&part=snippet`
  const playListRes: any = await icAxios.get(url)


  const data: videoItem[]  = playListRes.data.items.map((item : any) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    url: item.snippet.thumbnails.medium.url
  }));
  return data
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