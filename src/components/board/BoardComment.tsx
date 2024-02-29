import { BoardFormType, comment } from '../../types/components/BoardDetailModalComType'
import React, { ChangeEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { UserAtomType } from '../../types/state/AtomType'
import { useBoardCommentMutation } from '../../hooks/useBoardCommentMutation'

interface BoardCommentPropsType {
  formData : BoardFormType
  commentList?: comment[];
  newComment?: comment;
  handleClick: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  user: UserAtomType;
}

function BoardComment({ formData, handleClick, handleChange, user } : BoardCommentPropsType) {
  const {deleteCommentPost, addCommentPost} = useBoardCommentMutation()
  const [isUpdate , setIsUpdate] = useState<boolean>(false)

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
    console.log(idx)

  //   try {
  //     await addCommentPost(formData)
  //     formData.newComment = {id: '', userId: '', content: ''}
  //   } catch (error) {
  //     console.error(error);
  //   }
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
            <div>
              {comm?.userId}: {comm?.content}
            </div>
            {comm?.userId === user.id && (
              <div>
                <Button style={{ fontSize: '12px' }} onClick={()=>updateCommentHandler(idx)} >
                  수정
                </Button>
                <Button style={{ fontSize: '12px' }} onClick={()=>deleteCommentHandler(idx)} >
                  삭제
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default BoardComment;