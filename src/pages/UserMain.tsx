import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import axios from 'axios'
import { useQuery } from 'react-query'
import WeatherCom from '../components/WeatherCom'
import PlayListCom from '../components/common/PlayListCom'
import { Link } from 'react-router-dom'
import { useGeoLocation } from '../hooks/useGeoLocation'
import { weatherState } from '../store/atom/weatherState'
import TabCom from '../components/TabCom'
import { playListState } from '../store/atom/playListState'
import WeatherInfo from '../Types/state/weatherStateType'


const WeatherBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  grid-gap: 70px;
  justify-content: center;
  padding: initial;
  margin-top: 100px;
`;

const SecondWeatherBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
  grid-gap: 40px;
  justify-content: center;
  padding: initial;
  margin-top: 50px;
`;

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
  grid-gap: 40px;
  justify-content: center;
  padding: initial;
  margin-top: 150px;
`;


function UserMain() {
  let [tab, setTab] = useState(0)
  const [weather, setWeather] = useRecoilState<WeatherInfo>(weatherState)
  const [playList, setPlayList] = useRecoilState(playListState)

  const geolocationOptions = {
    enableHighAccuracy: false,
    timeout: 180000,
    maximumAge: 7000,
  }

  const { location, error } = useGeoLocation(geolocationOptions);

  const fetchData = async () => {
    if(location){
      const weatherRes = await axios.get("api/v1/user/media", {
        params: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      })
      const playListRes = await axios.get("api/v1/user/media/video", {
        params: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      })
      return{ weatherRes : weatherRes.data.result , playListRes : playListRes.data.result }

    }
  }
  const { isLoading } = useQuery("item", fetchData, {
      onSuccess: (data) => {
        if(data){
          setWeather(data.weatherRes)
          setPlayList(data.playListRes)
        }
      },
      enabled: !!location
    }
  )

  if (isLoading) return <>Loading...</>


  return (
    <>
      <div style={{ color: 'white' }}> </div>
      <WeatherBoxContainer>
        <WeatherCom />
        <Link to="/playlist"> <PlayListCom width={20} height={20} /> </Link>
      </WeatherBoxContainer>

      <TabContainer>
        <TabCom />
      </TabContainer>

      <SecondWeatherBoxContainer>
        <PlayListCom width={15} height={15}/>
        <PlayListCom width={15} height={15}/>
        <PlayListCom width={15} height={15}/>
        <PlayListCom width={15} height={15}/>
      </SecondWeatherBoxContainer>
    </>
  )
}

export default UserMain;