import { BoardFormType, comment } from '../../types/components/BoardDetailModalComType'
import React, { ChangeEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { UserAtomType } from '../../types/state/AtomType'
import { useBoardCommentMutation } from '../../hooks/useBoardCommentMutation'

interface BoardCommentPropsType {
  formData : BoardFormType
  setFormData: React.Dispatch<React.SetStateAction<BoardFormType>>
  commentList?: comment[];
  newComment?: comment;
  handleClick: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  user: UserAtomType;
}

function BoardComment({ formData, handleClick, handleChange, user, setFormData } : BoardCommentPropsType) {
  const {deleteCommentPost, addCommentPost, updateCommentPost} = useBoardCommentMutation()
  const [isUpdate , setIsUpdate] = useState<number>(0)
  const [updateComment , setUpdateComment] = useState<string>('')

  const addCommentHandler = async ()=>{
    if(!formData?.newComment?.content) return
    try {
      await addCommentPost(formData)
      formData.newComment = {id: '', userId: '', content: ''}
    } catch (error) {
      console.error(error);
    }
  }

   const updateCommentHandler = async (idx : number)=>{
    if(formData?.commentList){
      if(isUpdate === idx){
        setUpdateComment(formData?.commentList[idx]?.content);
        try {
          await updateCommentPost({ id: formData?.commentList[idx].id, content : updateComment })
          formData.newComment = {id: '', userId: '', content: ''}
        } catch (error) {
          console.error(error);
        }
      }else {
        setIsUpdate(idx)
        setUpdateComment(formData?.commentList[idx]?.content);
      }
    }
  }

  const deleteCommentHandler = async (idx : number)=>{
    try {
      if(formData?.commentList){
        await deleteCommentPost(formData?.commentList[idx]?.id)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const commentChange = (e : any, comm: comment) => {
    setUpdateComment(e.target.value)
    // setFormData((prevState)=>({
    //   ...prevState,
    //   commentList : formData?.commentList?.map((item)=>
    //     item.id === comm.id ? [...item, content : e.target.value] : item
    //   )
    // }))
  };

  return (
    <>
      <Form.Label>댓글</Form.Label>
      {
        user.id &&
        <Button style={{ fontSize: '12px', float: 'right' }} onClick={addCommentHandler}>
          등록
        </Button>
      }
      <Form.Control
        as="textarea"
        rows={2}
        value={formData?.newComment?.content}
        onClick={handleClick}
        onChange={handleChange}
        name="newComment" />
      {formData?.commentList?.map((comm: comment, idx: number) => {
        return (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px' }}>
            {
              isUpdate === idx  ?
                <>
                  {comm?.userId}:
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={updateComment}
                    onClick={handleClick}
                    onChange={(e)=>{commentChange(e, comm)}}
                    name="commentList" />
                </>
                :
                <>
                  {comm?.userId}: {comm?.content}
                </>
            }
            {
              comm?.userId === user.id &&
              <div>
                <Button style={{ fontSize: '12px' }} onClick={()=>updateCommentHandler(idx)} >
                  수정
                </Button>
                <Button style={{ fontSize: '12px' }} onClick={()=>deleteCommentHandler(idx)} >
                  삭제
                </Button>
              </div>
            }
          </div>
        );
      })}
    </>
  );
}

export default BoardComment;