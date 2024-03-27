import { useMutation, useQueryClient } from 'react-query'
import icAxios from '../util/icAxios'
import { BoardFormType } from '../types/components/BoardDetailModalComType'

export type updateComment= {
  id: string
  content: string
}



export const useBoardCommentMutation = () => {
  const queryClient = useQueryClient();

  const addCommentPost = useMutation((item:BoardFormType) =>
    icAxios.post(`/api/board/comment/add` , item),{
      onSuccess: ()=>{
        queryClient.invalidateQueries('boardList');
      },
      onError: (error) => {
        console.error(error);
      }
    }
  )

  const updateCommentPost = useMutation((item:updateComment) =>
    icAxios.post(`/api/board/comment/update` , item),{
      onSuccess: ()=>{
        queryClient.invalidateQueries('boardList');
      },
      onError: (error) => {
        console.error(error);
      }
    }
  )

  const deleteCommentPost = useMutation((id: string) =>
    icAxios.delete(`/api/board/comment/delete/${id}`),{
      onSuccess: ()=>{
        queryClient.invalidateQueries('boardList');
      },
      onError: (error) => {
        console.error(error);
      }
    }
  )

  return {
    addCommentPost: addCommentPost.mutateAsync,
    updateCommentPost: updateCommentPost.mutateAsync,
    deleteCommentPost: deleteCommentPost.mutateAsync,
  }
}