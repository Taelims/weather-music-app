import React from 'react'
import Card from 'react-bootstrap/Card';
import cleardayImage from '../../asset/clearday.jpg';
import rainydayImage from '../../asset/rainy.jpg';


function WeatherCom(data : any) {
  return (
    <Card style={{
      width: '30rem', height:'20rem',
      backgroundImage: data?.weather === 'Clear' ? `url(${cleardayImage})` : `url(${rainydayImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderColor: 'rgb(54,53,53)' }}>
      <Card.Body style = {{color: 'white', textAlign: 'center', fontSize: '2rem' , marginTop: '90px' }}>
        <Card.Title style = {{ fontSize: '2rem' }}>{data?.weather}</Card.Title>
        <Card.Text style = {{ fontSize: '1.5rem', marginTop: '25px' }}>
          <strong> 현재 온도  {data?.temp}&#8451; </strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WeatherCom;