import React from 'react'
import styled from 'styled-components'
import WeatherCom from '../components/userMain/WeatherCom'
import PlayListCom from '../components/common/PlayListCom'
import { Link } from 'react-router-dom'
import TabCom from '../components/userMain/TabCom'
import { useGetWeatherVideo } from '../hooks/useGetWeatherVideo'
import { useGetWeather } from '../hooks/useGetWeather'
import { weatherQuery, weatherVideoQuery } from '../types/page/userMainType'
import { useAuth } from '../hooks/useAuth'
import MyPliCom from '../components/userMain/MyPliCom'
import { useRecoilValue } from 'recoil'
import { UserState } from '../types/state/stateType'
import { userState } from '../store/atom/userState'


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
  const weatherData: weatherQuery = useGetWeather()
  const weatherVideoData: weatherVideoQuery = useGetWeatherVideo()
  const user: UserState = useRecoilValue(userState);

  return (
    weatherData.data &&
    <>
      {
        user?.playList && user?.playList?.length > 0 &&
        <WeatherBoxContainer>
          <MyPliCom/>
        </WeatherBoxContainer>
      }
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