import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { QueryClient, useQueryClient } from 'react-query'
import { PlayListItemType } from '../types/page/PlayListDetailType'
import Button from 'react-bootstrap/Button';
import { useRecoilState } from 'recoil'
import { UserAtomType } from '../types/state/AtomType'
import { userAtom } from '../store/atom/userAtom'
import styled from 'styled-components'
import MyPliCom from '../components/userMain/MyPliCom'

const BoxContainer = styled.div`
  display: grid;
  justify-content: left;
  margin-top: 100px;
`;

function PlayListDetail() {
  const [videoId, setVideoId] = useState<string>('');
  const params = useParams<string>();
  const queryClient: QueryClient = useQueryClient();
  const playList : PlayListItemType[] = queryClient.getQueryData( params.id === 'weather' ? 'weatherVideo' :['categoryVideo' , `${params.id}`] )!;
  const [user, setUser] = useRecoilState<UserAtomType>(userAtom);

  const handleSongClick = (songVideoId : string) => {
    setVideoId(songVideoId);
  };

  const addPli = (index : number) =>{
    setUser((prevData : UserAtomType): UserAtomType => ({
      ...prevData,
      playList: [
        ...prevData.playList!,
        {
          videoId: playList[index].videoId,
          title: playList[index].title,
          url: playList[index].url,
        }
      ]
    }));
  }

  const buttonCheck = (targetId : string) =>{
    let foundVideo : PlayListItemType = user.playList?.find(video => video.videoId === targetId)!;
    return foundVideo;
  }

  useEffect(()=>{
    if(playList){
      setVideoId(playList[0].videoId)
    }
  },[])

  return (
    <>
      {
        playList &&
        <div className="playlist-detail-container">
          <div className="video-area">
            <div className="video-frame">
              {videoId && (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>

          <div className="song-list-area">
            <ListGroup as="ul" className='song-list'>
              {
                playList?.map((item: PlayListItemType, index: number)=>(
                  <ListGroup.Item className= 'list-group-item' key={index} as="li">
                    <div onClick={() => handleSongClick(item.videoId)}>
                      <img
                        src={item.url}
                        alt="Thumbnail"
                        // className="img-thumbnail "
                        style={{ width: "50px", height: "50px" }}
                      />
                      {" " + item.title }
                    </div>
                    {
                      user.id && !buttonCheck(item.videoId) &&
                      <Button
                        key={index}
                        className='list-btn'
                        variant="info"
                        style={{ fontSize: '12px', fontWeight: 'bold' }}
                        onClick={()=>addPli(index)}>
                        add My Pli
                      </Button>
                    }
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          </div>
        </div>
      }
      <div>
      {
        user?.playList && user?.playList?.length > 0 &&
        <BoxContainer>
          <MyPliCom setVideoId = {setVideoId}/>
        </BoxContainer>
      }
      </div>
    </>
  );
}

export default PlayListDetail;