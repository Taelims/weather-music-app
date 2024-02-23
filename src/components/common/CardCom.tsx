import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import { BoardInfo } from '../../types/hook/hookType'
import { useBoardMutation } from '../../hooks/useBoardMutation'
import { FaComment } from "react-icons/fa";
import BoardDetailModal from '../board/BoardDetailModal'
import { GrView } from "react-icons/gr";
import Container from 'react-bootstrap/Container'


function CardCom({item} : {item :BoardInfo}) {
  const [boardModalShow, setBoardModalShow] = useState<boolean>(false)
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
      <Card style={{ width: '18rem' }} onClick={()=>setBoardModalShow(true)}>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          {/*<Card.Subtitle className="mb-2 text-muted">{item.subTitle}</Card.Subtitle>*/}
          <Card.Text>
            {item.text}
          </Card.Text>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Card.Text><GrView /> {item.views}  <FaComment/>  {item.comment?.length} </Card.Text>
          <Card.Text style={{fontSize: '0.95rem'}}> 등록일: {item.addDate} </Card.Text>
          </div>
          <Button variant="primary" onClick={()=>setBoardModalShow(true)}>수정</Button>
          <Button variant="secondary" onClick={(e)=>handleDelete(item.id)}>삭제</Button>
        </Card.Body>
      </Card>
      <BoardDetailModal
        boardModalShow={boardModalShow}
        onHide={()=>{setBoardModalShow(false)}}
      />
    </Container>
  );
}

export default CardCom;