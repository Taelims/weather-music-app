import { useQuery } from 'react-query'
import icAxios from '../util/icAxios'
import { VideoItemType } from '../types/components/PlayListComType'
import { VideoQueryType } from '../types/hook/HookType'


const fetchVideo = async (tab : string)=> {
  let keyword: string = tab + "때 듣기 좋은노래모음"
  let apiKey: string = process.env.REACT_APP_YOUTUBE_KEY!
  if(!apiKey) return
  let url:string = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${keyword}%20music&videoDuration=medium&type=video&part=snippet`
  const playListRes: any = await icAxios.get(url)
  const data: VideoItemType[]  = playListRes.data.items.map((item : any) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    url: item.snippet.thumbnails.medium.url
  }));
  return data
}

export const useGetCategoryVideo = (tab : string) => {
  const { isLoading, isError, data } : VideoQueryType = useQuery(
    ["categoryVideo", tab], () => fetchVideo(tab), {
      enabled: !!tab
    }
  )
  return { isLoading, isError, data }
}