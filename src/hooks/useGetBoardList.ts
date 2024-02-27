import { useQuery } from 'react-query'
import icAxios from '../util/icAxios'
import { BoardInfo, BoardQuery } from '../types/hook/hookType'
import { useSetRecoilState } from 'recoil'
import { boardListAtom } from '../store/atom/boardListAtom'


const fetchBoard = async ()=> {
  const res: {data : BoardInfo} = await icAxios.get('/api/board')
  return res.data
}

export const useGetBoardList = () => {
  const setBoardItem = useSetRecoilState<BoardInfo[]>(boardListAtom)

  const { isLoading, isError, data } : BoardQuery = useQuery(
    ["boardList"], () => fetchBoard(), {
      onSuccess(){
        setBoardItem(data!)
      }
    }
  )
  return { isLoading, isError, data }
}