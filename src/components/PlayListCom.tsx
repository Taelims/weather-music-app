import React from 'react'
import Card from 'react-bootstrap/Card';



interface PlayListProps {
  width: number;
  height: number;
}

function PlayListCom({width, height} : PlayListProps) {
  return (
    <Card style={{ width: `${width}rem`, height: `${height}rem` }}>
      <Card.Body>
        <Card.Title>suitable play list</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>

        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PlayListCom;