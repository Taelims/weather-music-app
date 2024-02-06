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
import { weatherPlayListState } from '../store/atom/playListState'
import { WeatherState } from '../types/state/stateType'


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
  const [weather, setWeather] = useRecoilState<WeatherState>(weatherState)
  const [playList, setPlayList] = useRecoilState(weatherPlayListState)

  const geolocationOptions = {
    enableHighAccuracy: false,
    timeout: 180000,
    maximumAge: 7000,
  }

  const { location, error } = useGeoLocation(geolocationOptions);

  const fetchData = async () => {
    if(location){
      const weatherRes = await axios.get("api/v1/user/media/weather", {
        params: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      })
      let keyword = weatherRes.data.result.weather
      keyword = keyword === 'Clear' ? '맑은 날씨 음악' : '흐린 날씨 음악';
      const playListRes = await axios.get("api/v1/user/media/video", {
        params: {
          keyword: keyword,
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
        <Link to="/playlist/weather"> <PlayListCom key={0} index={0} width={20} height={20} /> </Link>
      </WeatherBoxContainer>

      <TabContainer>
        <TabCom />
      </TabContainer>
    </>
  )
}

export default UserMain;