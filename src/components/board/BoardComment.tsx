import { BoardFormType, comment } from '../../types/components/BoardDetailModalComType'
import React, { ChangeEvent } from 'react'
import { Form, Button } from 'react-bootstrap';
import { UserAtomType } from '../../types/state/AtomType'
import { BoardItemType } from '../../types/hook/HookType'

interface BoardCommentPropsType {
  formData : BoardFormType
  commentList?: comment[];
  newComment?: comment;
  handleClick: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  user: UserAtomType;
  updatePost: (updatedFormData : BoardItemType)=> void;
}

function BoardComment({ formData, handleClick, handleChange, user, updatePost } : BoardCommentPropsType) {
  const CommentHandler = async ()=>{
    if(!formData?.newComment?.content) return
    try {
      const updatedFormData : BoardFormType = {
        ...formData,
        commentList: formData.commentList ? [...formData.commentList, formData?.newComment!] : [formData?.newComment!],
        newComment: {id: '', userId: '', content: ''}
      };
      updatePost(updatedFormData)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Form.Label>댓글</Form.Label>
      {
        user.id &&
        <Button style={{ fontSize: '12px', float: 'right' }} onClick={CommentHandler}>
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
              {' '}
              {comm?.userId}: {comm?.content}{' '}
            </div>
            {comm?.userId === user.id && (
              <div>
                <Button style={{ fontSize: '12px' }} >
                  수정
                </Button>
                <Button style={{ fontSize: '12px' }} >
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