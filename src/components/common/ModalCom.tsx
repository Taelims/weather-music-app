import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { ChangeEvent, useState } from 'react'
import axios from 'axios'

interface ModalProps {
  formType : string
  onHide: () => void;
  show: boolean;
}

interface formInfo {
  id: string;
  password: string;
}

function ModalCom({ formType, onHide, show } : ModalProps) {
  const [formData, setFormData] = useState<formInfo>({
    id : '',
    password: '',
  });

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const submitHandler = async () => {
    try {
      if(formType === 'login'){
        const response = await axios.post('/api/login', { id: formData.id , password: formData.password });
        const token = response.data.token;
        localStorage.setItem('token', token);
      }else {
        await axios.post('/api/create/account', { id: formData.id , password: formData.password });
      }
    } catch (error) {
      console.error('create account fail:', error);
    }
    setFormData({
        id: '',
        password: '',
      })
    onHide()
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {
            formType === 'login' ? 'Login' : 'New Account'
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>ID</Form.Label>
        <Form.Control
          value={formData.id}
          onChange={handleChange}
          name='id'
        />
        <Form.Label>PassWord</Form.Label>
        <Form.Control
          value={formData.password}
          onChange={handleChange}
          name='password'
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitHandler}>Submit</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCom