import { useMutation, useQueryClient } from 'react-query'
import icAxios from '../util/icAxios'

export const useBoardViews = () => {
  const queryClient = useQueryClient();

  const plusViews = useMutation((id : string) =>
    icAxios.post(`/api/board/views/${id}`),{
      onSuccess: ()=>{
        queryClient.invalidateQueries('boardList');
      },
      onError: (error) => {
        console.error(error);
      }
    }
  )

  return {
    plusViews: plusViews.mutateAsync,
  }
}