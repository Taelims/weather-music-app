import Card from 'react-bootstrap/Card';
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import ModalCom from './ModalCom'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const Container = styled.div`
`;

type CardProps = {
  item: {
    id: string;
    title: string;
    subTitle: string;
    text: string;
  }
}

function CardCom(props : CardProps) {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();

  const deleteItemMutation = useMutation((id) =>
    axios.delete(`/api/delete/${id}`)
  )

  const handleDelete = async (id : any) => {
    try {
      await deleteItemMutation.mutateAsync(id);
      await queryClient.invalidateQueries('item');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{props.item.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.item.subTitle}</Card.Subtitle>
          <Card.Text>
            {props.item.text}
          </Card.Text>
          <Button variant="primary" onClick={()=>setShow(true)}>수정</Button>
          <Button variant="secondary" onClick={(e)=>handleDelete(props.item.id)}>삭제</Button>
        </Card.Body>
      </Card>
      <ModalCom
        isUpdate = {true}
        item = {props.item}
        show={show}
        onHide={()=>{setShow(false)}}
      />
    </Container>
  );
}

export default CardCom;