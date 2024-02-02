import React from 'react'
import Card from 'react-bootstrap/Card';
import { useRecoilValue } from 'recoil'
import { playListState } from '../../store/atom/playListState'


interface PlayListProps {
  width: number;
  height: number;
}

function PlayListCom({width, height} : PlayListProps) {
  const playList = useRecoilValue(playListState);
  return (
    <Card style={{ width: `${width}rem`, height: `${height}rem`, padding: '0px', borderColor: 'rgb(54,53,53)' }}>
      <Card.Body style={{ padding: 0 }}>
        <Card.Img
          variant="top"
          src={ playList.items[0].snippet.thumbnails.medium.url }
          style={{ width: '100%', height: '100%', objectFit: 'cover'}}
        />
        <Card.Footer>
          <div style={{ color: 'white', textAlign: 'center' }}><strong>

            { playList.items[0].snippet.title }  </strong></div>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default PlayListCom;