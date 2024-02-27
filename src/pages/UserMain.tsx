import React from 'react'
import styled from 'styled-components'
import WeatherCom from '../components/userMain/WeatherCom'
import PlayListCom from '../components/common/PlayListCom'
import { Link } from 'react-router-dom'
import TabCom from '../components/userMain/TabCom'
import { useGetWeatherVideo } from '../hooks/useGetWeatherVideo'
import { useGetWeather } from '../hooks/useGetWeather'
import { WeatherQueryType, WeatherVideoQueryType } from '../types/page/UserMainType'
import { useAuth } from '../hooks/useAuth'


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
  useAuth()
  const weatherData: WeatherQueryType = useGetWeather()
  const weatherVideoData: WeatherVideoQueryType = useGetWeatherVideo()

  return (
    weatherData.data &&
    <>
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