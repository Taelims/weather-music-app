import React from 'react'
import Card from 'react-bootstrap/Card';
import { useRecoilValue } from 'recoil'
import { categoryPlayListState, weatherPlayListState } from '../../store/atom/playListState'


interface PlayListProps {
  tab? : boolean
  width: number;
  height: number;
  key: any
  index : number
}

function PlayListCom({tab, index, width, height} : PlayListProps) {
  const playList = useRecoilValue( tab ? categoryPlayListState : weatherPlayListState );
  return (
    <Card style={{ width: `${width}rem`, height: `${height}rem`, padding: '0px', borderColor: 'rgb(54,53,53)' }}>
      <Card.Body style={{ padding: 0 }}>
        <Card.Img
          variant="top"
          src={ playList.item[index].url }
          style={{ width: `${width}rem`, height: `${height}rem`}}
        />
        <Card.Footer>
          <div style={{ color: 'white', textAlign: 'center' }}><strong>
            { playList.item[index].title }  </strong></div>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default PlayListCom;