import { useQuery } from 'react-query'
import icAxios from '../util/icAxios'
import { BoardInfo, BoardQuery } from '../types/hook/hookType'


const fetchBoard = async ()=> {
  const res: {data : BoardInfo} = await icAxios.get('/api/board')
  console.log(res)
  return res.data
}

export const useGetBoardList = () => {
  const { isLoading, isError, data } : BoardQuery = useQuery(
    ["boardList"], () => fetchBoard(), {
    }
  )
  return { isLoading, isError, data }
}