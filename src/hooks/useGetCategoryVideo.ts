import { useQuery } from 'react-query'
import icAxios from '../util/icAxios'


const fetchVideo = async (tab : string)=> {
  const playListRes = await icAxios.get("api/v1/user/media/video", {
    params: {
      keyword: tab,
    }
  })
  return playListRes.data.result
}

export const useGetCategoryVideo = (tab : any) => {
  const { isLoading, isError, data } = useQuery(
    ["categoryVideo", tab], () => fetchVideo(tab), {
      enabled: !!tab
    }
  )
  return { isLoading, isError, data }
}