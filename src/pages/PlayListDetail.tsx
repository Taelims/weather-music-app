import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'

function PlayListDetail() {

  const [videoId, setVideoId] = useState('');

  const handleSongClick = (songVideoId : any) => {
    setVideoId(songVideoId);
  };

  useEffect(()=>{
    setVideoId('JleoAppaxi0')
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
          <ListGroup.Item as="li" onClick={() => handleSongClick('JleoAppaxi0')}>
           IU 'love wins all'
          </ListGroup.Item>
          <ListGroup.Item as="li" onClick={() => handleSongClick('asd')}>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item as="li">
            Morbi leo risus
          </ListGroup.Item>
          <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default PlayListDetail;