import React from 'react'
import Card from 'react-bootstrap/Card';


interface PlayListProps {
  data : any
  width: number;
  height: number;
  key: any
  index : number
}

function PlayListCom({data, index, width, height} : PlayListProps) {
  return (
    <Card style={{ width: `${width}rem`, height: `${height}rem`, padding: '0px', borderColor: 'rgb(54,53,53)' }}>
      <Card.Body style={{ padding: 0 }}>
        <Card.Img
          variant="top"
          src={ data?.item[index].url }
          style={{ width: `${width}rem`, height: `${height}rem`}}
        />
        <Card.Footer>
          <div style={{ color: 'white', textAlign: 'center' }}><strong>
            { data?.item[index].title }  </strong></div>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default PlayListCom;