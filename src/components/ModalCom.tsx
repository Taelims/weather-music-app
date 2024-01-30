import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { ChangeEvent, useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

interface ModalProps {
  isUpdate? : boolean
  item?: {
    id: string;
    title: string;
    subTitle: string;
    text: string;
  }
  onHide: () => void;
  show: boolean;
}

interface formInfo {
  id: string;
  title: string;
  subTitle: string;
  text: string;
}

function ModalCom(props : ModalProps) {
  useEffect(() => {
    if(props.isUpdate && props.item){
      setFormData(props.item)
    }
  },[props.isUpdate, props.item])

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<formInfo>({
    id : '',
    title: '',
    subTitle: '',
    text: '',
  });

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(!props.isUpdate){
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        id : uuid()
      }));
    }else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const createItemMutation = useMutation((newItem:formInfo) =>
    axios.post(`/api/create` , newItem)
  )

  const updateItemMutation = useMutation((updateItem:formInfo) =>
    axios.post(`/api/update` , updateItem)
  )


  const submitHandler = async () => {
    if(!props.isUpdate)
      try {
        await createItemMutation.mutateAsync(formData);
        await queryClient.invalidateQueries('item');
      } catch (error) {
        console.error(error);
    }else {
      try {
        await updateItemMutation.mutateAsync(formData);
        await queryClient.invalidateQueries('item');
      } catch (error) {
        console.error(error);
      }
    }

    setFormData(
      {
        id: '',
        title: '',
        subTitle: '',
        text: ''
      })
    props.onHide()
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Article
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={formData.title}
          onChange={handleChange}
          name='title'
        />
        <Form.Label>Sub title</Form.Label>
        <Form.Control
          value={formData.subTitle}
          onChange={handleChange}
          name='subTitle'
        />
        <Form.Label>Text</Form.Label>
        <Form.Control
          value={formData.text}
          onChange={handleChange}
          name='text'
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitHandler}>Submit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCom