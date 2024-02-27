import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BoardFormInfo, BoardPropsType } from '../../types/components/BoardDetailModalComType'
import { useBoardMutation } from '../../hooks/useBoardMutation'
import uuid from 'react-uuid'
import moment from 'moment'


function BoardDetailModal({ item, onHide, boardModalShow, boardModalName } : BoardPropsType) {
  useEffect(()=>{
    if(boardModalName !== 'create'){
      setFormData(item!)
    }
  },[item, boardModalName])

  const [formData, setFormData] = useState<BoardFormInfo>({
    id : '',
    title : '',
    text: '',
    addDate: '',
    comment: [],
    newComment: '',
  });
  const {addPost, updatePost } = useBoardMutation()

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value }:{ name: string; value: string; } = e.target;
    setFormData((prevData : BoardFormInfo) => ({
      ...prevData,
      [name]: value,
      id : boardModalName === 'create' ? uuid() : prevData.id,
      addDate : boardModalName === 'create' ? moment().format('YYYY-MM-DD') : prevData.addDate
    }));
  };

  const submitHandler = async () => {
    try {
      if(boardModalName === 'create'){
        await addPost(formData)
      }else if(boardModalName === 'update'){
        await updatePost(formData)
      }else if(boardModalName === 'view'){
        const updatedFormData : BoardFormInfo = {
          ...formData,
          comment: formData.comment ? [...formData.comment!, formData.newComment!] : [formData.newComment!],
          newComment: ''
        };
        await updatePost(updatedFormData)
      }
    } catch (error) {
      console.error(error);
    }
    setFormData({
      id : '',
      title : '',
      text: '',
      addDate: '',
      newComment: '',
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
        />
        {
        boardModalName === 'view' &&
          <>
          <Form.Label>댓글</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={formData?.newComment}
            onChange={handleChange}
            name='newComment'
          />
          {
            formData?.comment?.map((comm: string, idx: number)=>{
              return <div key={idx}>{comm}</div>
            })
          }
        </>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitHandler}>Submit</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BoardDetailModal