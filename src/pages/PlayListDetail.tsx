import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useRecoilValue } from 'recoil'
import { playListState } from '../store/atom/playListState'

function PlayListDetail() {
  const [videoId, setVideoId] = useState('');
  const playList = useRecoilValue(playListState)

  const handleSongClick = (songVideoId : any) => {
    setVideoId(songVideoId);
  };

  useEffect(()=>{
    setVideoId(playList.items[0].id.videoId)
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
            playList.items.map((item, index)=>(
              <ListGroup.Item key={index} as="li" onClick={() => handleSongClick(item.id.videoId)}>
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt="Thumbnail"
                  className="img-thumbnail "
                  style={{ width: "50px", height: "50px" }} // 이미지 크기 조정을 위한 스타일
                />
                {" " + item.snippet.title }
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>
    </div>
  );
}

export default PlayListDetail;