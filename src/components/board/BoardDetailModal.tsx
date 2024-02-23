import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { ChangeEvent, useState } from 'react'
import { BoardFormInfo, BoardPropsType } from '../../types/components/BoardDetailModalComType'
import { useBoardMutation } from '../../hooks/useBoardMutation'
import uuid from 'react-uuid'
import moment from 'moment'


function BoardDetailModal({ onHide, boardModalShow } : BoardPropsType) {
  const [formData, setFormData] = useState<BoardFormInfo>({
    id : '',
    title : '',
    text: '',
    addDate: '',
  });
  const {addPost } = useBoardMutation()

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value }:{ name: string; value: string; } = e.target;
    setFormData((prevData : BoardFormInfo) => ({
      ...prevData,
      [name]: value,
      id : uuid(),
      addDate : moment().format('YYYY-MM-DD')
    }));
  };

  const submitHandler = async () => {
    try {
      await addPost(formData)
    } catch (error) {
      console.error(error);
    }
    setFormData({
      id : '',
      title : '',
      text: '',
      addDate: '',
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
          Board
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={formData.title}
          onChange={handleChange}
          name='title'
        />
        <Form.Label>text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.text}
          onChange={handleChange}
          name='text'
        />
        <Form.Label>댓글</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={formData.text}
          onChange={handleChange}
          name='text'
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitHandler}>Submit</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BoardDetailModal