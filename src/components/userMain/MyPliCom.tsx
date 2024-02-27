import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { PlayListItemType } from '../../types/page/PlayListDetailType'
import { useRecoilState } from 'recoil'
import { UserAtomType } from '../../types/state/AtomType'
import { userAtom } from '../../store/atom/userAtom'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button'


function MyPliCom({setVideoId} : { setVideoId: React.Dispatch<React.SetStateAction<string>> }) {
  const [user ,setUser] = useRecoilState<UserAtomType>(userAtom);

  const deletePli = (index : number) =>{
    setUser((prevData: UserAtomType) : UserAtomType =>({
      ...prevData,
      playList: prevData.playList?.filter((item: PlayListItemType, idx : number)=> idx !== index)
    }))
  }

  const handleSongClick = (songVideoId : string) => {
    setVideoId(songVideoId);
  };

  return (
    <div className="song-list-area">
      <h3> <Badge bg="secondary" >{user.id}님의 PlayList</Badge> </h3><br></br>
      <ListGroup as="ul" className='song-list'>
        {
          user.playList?.map((item: PlayListItemType, index: number)=>(
            <ListGroup.Item className= 'list-group-item' key={index} as="li" >
              <div onClick={() => handleSongClick(item.videoId)} >
                <img
                  src={item.url}
                  alt="Thumbnail"
                  // className="img-thumbnail "
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
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