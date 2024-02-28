import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BoardFormType, BoardPropsType } from '../../types/components/BoardDetailModalComType'
import { useBoardMutation } from '../../hooks/useBoardMutation'
import uuid from 'react-uuid'
import moment from 'moment'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAtom } from '../../store/atom/userAtom'
import Swal from 'sweetalert2'
import { modalShowAtom } from '../../store/atom/modalShowAtom'
import BoardComment from './BoardComment'


function BoardDetailModal({ item, onHide, boardModalShow, boardModalName } : BoardPropsType) {
  useEffect(()=>{
    if(boardModalName !== 'create'){
      setFormData(item!)
    }
  },[item, boardModalName])

  const user = useRecoilValue(userAtom)
  const loginModalShow = useSetRecoilState(modalShowAtom)

  const [formData, setFormData] = useState<BoardFormType>({
    id : '',
    title : '',
    text: '',
    addDate: '',
    commentList: [],
    newComment: {id: '', userId: '', content: ''},
  });
  const {addPost, updatePost } = useBoardMutation()

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value }:{ name: string; value: string; } = e.target;
    setFormData((prevData : BoardFormType) => ({
      ...prevData,
      [name]: value,
      newComment: boardModalName === 'view' ? {id: uuid(), userId: user.id, content: value} : undefined,
      id : boardModalName === 'create' ? uuid() : prevData.id,
      addDate : boardModalName === 'create' ? moment().format('YYYY-MM-DD') : prevData.addDate
    }));
  };

  const handleClick = async () =>{
    if(!user.id){
      await Swal.fire({
        icon: 'warning',
        title: '인증 오류',
        text: '로그인을 해주세요',
      })
      return loginModalShow(true)
    }
  }

  const submitHandler = async () => {
    console.log(formData)
    try {
      if(boardModalName === 'create'){
        await addPost(formData)
      }else if(boardModalName === 'update'){
        await updatePost(formData)
      }
    } catch (error) {
      console.error(error);
    }
    setFormData({
      id : '',
      title : '',
      text: '',
      addDate: '',
      newComment: {id: '', userId: '', content: ''},
    })
    onHide()
  };

  return (
    <Modal
      show={boardModalShow}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Article
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Title</Form.Label>
        <Form.Control
          readOnly={boardModalName=== 'view'}
          value={formData?.title || ''}
          onChange={handleChange}
          name='title'
        />
        <Form.Label>text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          readOnly={boardModalName=== 'view'}
          value={formData?.text}
          onChange={handleChange}
          name='text'
        /><br/>
        {
        boardModalName === 'view' &&
         <BoardComment
           formData={formData}
           handleClick={handleClick}
           handleChange={handleChange}
           user={user}
           updatePost={updatePost}
         />
        }
      </Modal.Body>
      {
        boardModalName !== 'view' &&
        <Modal.Footer>
          <Button onClick={submitHandler}>Submit</Button>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      }
    </Modal>
  );
}

export default BoardDetailModal