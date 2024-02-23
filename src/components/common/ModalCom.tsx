import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { ChangeEvent, useState } from 'react'
import { useSignInUp } from '../../hooks/useSignInUp'
import { formInfo, ModalProps } from '../../types/components/ModalComType'


function ModalCom({ formType, onHide, signModalShow } : ModalProps) {
  const { login, createAccount } = useSignInUp()
  const [formData, setFormData] = useState<formInfo>({
    id : '',
    password: '',
  });

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value }:{ name: string; value: string; } = e.target;
    setFormData((prevData : formInfo) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async () => {
    try {
      if(formType === 'login'){
        await login( formData.id, formData.password );
      }else {
        await createAccount( formData.id, formData.password );
      }
    } catch (error) {
      console.error(error);
    }
    setFormData({
      id: '',
      password: '',
    })
    onHide()
  };

  return (
    <Modal
      show={signModalShow}
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