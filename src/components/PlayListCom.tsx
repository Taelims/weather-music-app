import React from 'react'
import Card from 'react-bootstrap/Card';


interface PlayListProps {
  width: number;
  height: number;
}

function PlayListCom({width, height} : PlayListProps) {
  return (
    <Card style={{ width: `${width}rem`, height: `${height}rem`, padding: '0px', borderColor: 'rgb(54,53,53)' }}>
      <Card.Body style={{ padding: 0 }}>
        <Card.Img
          variant="top"
          src="https://img.youtube.com/vi/KXPw5Xfui-Y/maxresdefault.jpg"
          style={{ width: '100%', height: '100%', objectFit: 'cover'}}
        />
        <Card.Footer>
          <div style={{ color: 'white', textAlign: 'center' }}><strong> charlie puth - attention  </strong></div>
        </Card.Footer>

      </Card.Body>
    </Card>
  );
}

export default PlayListCom;