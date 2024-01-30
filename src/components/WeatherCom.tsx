import React from 'react'
import Card from 'react-bootstrap/Card';


function WeatherCom() {
  return (
    <Card style={{ width: '20rem', height:'20rem' }}>
      <Card.Body>
        <Card.Title>wheather</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>

        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  );
}

export default WeatherCom;