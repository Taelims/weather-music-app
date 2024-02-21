import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { playListItem } from '../../types/page/playListDetailType'
import { useRecoilState } from 'recoil'
import { UserState } from '../../types/state/stateType'
import { userState } from '../../store/atom/userState'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button'


function MyPliCom() {
  const [user ,setUser] = useRecoilState<UserState>(userState);

  const deletePli = (index : number) =>{
    setUser((prevData: UserState) : UserState =>({
      ...prevData,
      playList: prevData.playList?.filter((item: playListItem, idx : number)=> idx !== index)
    }))
  }

  return (
    <div className="song-list-area">
      <h3> <Badge bg="secondary" >{user.id}님의 PlayList</Badge> </h3><br></br>
      <ListGroup as="ul" className='song-list'>
        {
          user.playList?.map((item: playListItem, index: number)=>(
            <ListGroup.Item className= 'list-group-item' key={index} as="li" >
              <img
                src={item.url}
                alt="Thumbnail"
                // className="img-thumbnail "
                style={{ width: "50px", height: "50px" }}
              />
              {" " + item.title }
              <Button
                key={index}
                className='list-btn'
                variant="danger"
                style={{ fontSize: '12px', fontWeight: 'bold' }}
                onClick={()=>deletePli(index)}>
                delete Pli
              </Button>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </div>
  );
}

export default MyPliCom;