import { useMutation, useQueryClient } from 'react-query'
import { BoardInfo } from '../types/hook/hookType'
import icAxios from '../util/icAxios'

export const useBoardMutation = () => {
  const queryClient = useQueryClient();

  const addPost = useMutation((item:BoardInfo) =>
    icAxios.post(`/api/board/create` , item),{
      onSuccess: ()=>{
        queryClient.invalidateQueries('boardList');
      },
      onError: (error) => {
        console.error(error);
      }
    }
  )

  const updatePost = useMutation((item:BoardInfo) =>
    icAxios.post(`/api/board/update` , item),{
      onSuccess: ()=>{
        queryClient.invalidateQueries('boardList');
      },
      onError: (error) => {
        console.error(error);
      }
    }
  )

  const deletePost = useMutation((id: string) =>
    icAxios.delete(`/api/board/delete/${id}`),{
      onSuccess: ()=>{
        queryClient.invalidateQueries('boardList');
      },
      onError: (error) => {
        console.error(error);
      }
    }
  )

  return {
    addPost: addPost.mutateAsync,
    updatePost: updatePost.mutateAsync,
    deletePost: deletePost.mutateAsync,
  }
}