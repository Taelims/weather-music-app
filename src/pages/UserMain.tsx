import React from 'react'
import styled from 'styled-components'
import WeatherCom from '../components/userMain/WeatherCom'
import PlayListCom from '../components/common/PlayListCom'
import { Link } from 'react-router-dom'
import TabCom from '../components/userMain/TabCom'
import { useGetWeatherVideo } from '../hooks/useGetWeatherVideo'
import { useGetWeather } from '../hooks/useGetWeather'
import { weatherQuery, weatherVideoQuery } from '../types/page/userMainType'


const WeatherBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  grid-gap: 70px;
  justify-content: center;
  padding: initial;
  margin-top: 100px;
`;

const TabContainer = styled.div`
  margin-top: 150px;
`;


function UserMain() {
  const weatherData: weatherQuery = useGetWeather()
  const weatherVideoData: weatherVideoQuery = useGetWeatherVideo()

  return (
    <>
      <div style = {{ color: 'white' }}> </div>
      <WeatherBoxContainer>
        <WeatherCom data = {weatherData.data}/>
        <Link to="/playlist/weather"> <PlayListCom data ={weatherVideoData.data} idx={0} width={20} height={20} /> </Link>
      </WeatherBoxContainer>

      <TabContainer>
        <TabCom />
      </TabContainer>
    </>
  )
}

export default UserMain;