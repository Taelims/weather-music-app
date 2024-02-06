import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useRecoilValue } from 'recoil'
import { categoryPlayListState, weatherPlayListState } from '../store/atom/playListState'
import { useParams } from 'react-router-dom'

function PlayListDetail() {
  const [videoId, setVideoId] = useState('');
  const params = useParams();
  const playList = useRecoilValue(params.id === 'weather' ? weatherPlayListState : categoryPlayListState )

  const handleSongClick = (songVideoId : any) => {
    setVideoId(songVideoId);
  };

  useEffect(()=>{
    setVideoId(playList.item[0].videoId)
  },[])

  return (
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
            playList.item.map((item, index)=>(
              <ListGroup.Item className= 'list-group-item' key={index} as="li" onClick={() => handleSongClick(item.videoId)}>
                <img
                  src={item.url}
                  alt="Thumbnail"
                  // className="img-thumbnail "
                  style={{ width: "50px", height: "50px" }}
                />
                {" " + item.title }
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>
    </div>
  );
}

export default PlayListDetail;