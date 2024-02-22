import Card from 'react-bootstrap/Card';
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import { BoardInfo } from '../../types/hook/hookType'
import { useBoardMutation } from '../../hooks/useBoardMutation'

const Container = styled.div`
`;


function CardCom({item} : {item :BoardInfo}) {
  const [show, setShow] = useState(false);
  const {addPost , updatePost, deletePost } = useBoardMutation()

  const handleDelete = async (id : any) => {
    try {
      await deletePost(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          {/*<Card.Subtitle className="mb-2 text-muted">{item.subTitle}</Card.Subtitle>*/}
          <Card.Text>
            {item.text}
          </Card.Text>
          <Button variant="primary" onClick={()=>setShow(true)}>수정</Button>
          <Button variant="secondary" onClick={(e)=>handleDelete(item.id)}>삭제</Button>
        </Card.Body>
      </Card>
      {/*<ModalCom*/}
      {/*  show={show}*/}
      {/*  onHide={()=>{setShow(false)}}*/}
      {/*/>*/}
    </Container>
  );
}

export default CardCom;