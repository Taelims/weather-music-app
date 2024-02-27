import { useQuery } from 'react-query'
import icAxios from '../util/icAxios'
import { BoardItemType, BoardQueryType } from '../types/hook/HookType'
import { useSetRecoilState } from 'recoil'
import { boardListAtom } from '../store/atom/boardListAtom'


const fetchBoard = async ()=> {
  const res: {data : BoardItemType} = await icAxios.get('/api/board')
  return res.data
}

export const useGetBoardList = () => {
  const setBoardItem = useSetRecoilState<BoardItemType[]>(boardListAtom)

  const { isLoading, isError, data } : BoardQueryType = useQuery(
    ["boardList"], () => fetchBoard(), {
      onSuccess(){
        setBoardItem(data!)
      }
    }
  )
  return { isLoading, isError, data }
}