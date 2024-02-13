import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { QueryClient, useQueryClient } from 'react-query'
import { playList } from '../types/page/playListDetailType'

function PlayListDetail() {
  const [videoId, setVideoId] = useState<string>('');
  const params = useParams<string>();
  const queryClient: QueryClient = useQueryClient();
  const playList : playList | undefined = queryClient.getQueryData( params.id === 'weather' ? 'weatherVideo' :['categoryVideo' , `${params.id}`] );

  const handleSongClick = (songVideoId : string) => {
    setVideoId(songVideoId);
  };

  useEffect(()=>{
    if(playList){
      setVideoId(playList.item[0].videoId)
    }
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
            playList?.item.map((item: playList['item'][number], index: number)=>(
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