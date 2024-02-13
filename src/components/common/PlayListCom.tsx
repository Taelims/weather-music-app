import React from 'react'
import Card from 'react-bootstrap/Card';
import { playListComProps } from '../../types/components/playListComType'


function PlayListCom({data, idx, width, height} : playListComProps) {
  return (
    <Card style={{ width: `${width}rem`, height: `${height}rem`, padding: '0px', borderColor: 'rgb(54,53,53)' }}>
      <Card.Body style={{ padding: 0 }}>
        <Card.Img
          variant="top"
          src={ data?.item[idx].url }
          style={{ width: `${width}rem`, height: `${height}rem`}}
        />
        <Card.Footer>
          <div style={{ color: 'white', textAlign: 'center' }}><strong>
            { data?.item[idx].title }  </strong></div>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default PlayListCom;