import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import { BoardItemType } from '../../types/hook/HookType'
import { useBoardMutation } from '../../hooks/useBoardMutation'
import { FaComment } from "react-icons/fa";
import BoardDetailModal from '../board/BoardDetailModal'
import { GrView } from "react-icons/gr";
import Container from 'react-bootstrap/Container'
import { useRecoilState } from 'recoil'
import { boardModalNameAtom } from '../../store/atom/boardModalNameAtom'
import { useBoardViews } from '../../hooks/useBoardViews'


function CardCom({item} : {item :BoardItemType}) {
  const [boardModalShow, setBoardModalShow] = useState<boolean>(false)
  const [boardModalName , setBoardModalName] = useRecoilState<string>(boardModalNameAtom)
  const {deletePost} = useBoardMutation()
  const {plusViews} = useBoardViews()

  const handleDelete = async (id : any) => {
    try {
      await deletePost(id);
    } catch (error) {
      console.error(error);
    }
  };

  const clickCard = async () =>{
    setBoardModalShow(true);
    setBoardModalName('view');
    await plusViews(item.id)
  }

  const clickUpdate = (e : any) =>{
    e.stopPropagation()
    setBoardModalShow(true)
    setBoardModalName('update')
  }

  const clickDelete = async (e : any) =>{
    e.stopPropagation()
    await handleDelete(item.id)
  }

  return (
    <Container>
      <Card style={{ width: '18rem' }} onClick={clickCard}>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          {/*<Card.Subtitle className="mb-2 text-muted">{item.subTitle}</Card.Subtitle>*/}
          <Card.Text>
            {item.text}
          </Card.Text>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Card.Text><GrView /> {item.views}  <FaComment/>  {item.commentList?.length} </Card.Text>
          <Card.Text style={{fontSize: '0.95rem'}}> 등록일: {item.addDate} </Card.Text>
          </div>

          <Button variant="primary" onClick={clickUpdate}>수정</Button>
          <Button variant="secondary" onClick={clickDelete}>삭제</Button>
        </Card.Body>
      </Card>
      <BoardDetailModal
        item ={item}
        boardModalName = {boardModalName}
        boardModalShow={boardModalShow}
        onHide={()=>{setBoardModalShow(false)}}
      />
    </Container>
  );
}

export default CardCom;