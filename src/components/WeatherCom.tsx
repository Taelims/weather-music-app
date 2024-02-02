import React from 'react'
import Card from 'react-bootstrap/Card';
import cleardayImage from '../asset/rainy.jpg';
import { useRecoilValue } from 'recoil'
import { weatherState } from '../store/atom/weatherState'

interface WeatherInfo {
  weather: { main: string }[];
  main: { temp: number };
}

function WeatherCom() {
  const weather = useRecoilValue<WeatherInfo>(weatherState);

  return (
    <Card style={{ width: '20rem', height:'20rem', backgroundImage: `url(${cleardayImage})`, backgroundSize: 'cover', backgroundPosition: 'center', borderColor: 'rgb(54,53,53)' }}>
      <Card.Body style = {{color: 'white', textAlign: 'center', fontSize: '2rem' , marginTop: '90px' }}>
        <Card.Title style = {{ fontSize: '2rem' }}>{weather.weather[0].main}</Card.Title>
        <Card.Text style = {{ fontSize: '1.5rem', marginTop: '25px' }}>
          <strong> 현재 온도  {weather.main.temp}&#8451; </strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WeatherCom;