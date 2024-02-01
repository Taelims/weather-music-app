import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import axios from 'axios'
import { useQuery } from 'react-query'
import WeatherCom from '../components/WeatherCom'
import PlayListCom from '../components/PlayListCom'
import { Link } from 'react-router-dom'
import { useGeoLocation } from '../hooks/useGeoLocation'
import { weatherState } from '../store/atom/weatherState'
import TabCom from '../components/TabCom'


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

interface WeatherInfo {
  main: string,
  temp: string,
}


function UserMain() {
  const [weather, setWeather] = useRecoilState<WeatherInfo>(weatherState)

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
  }

  const { location, error } = useGeoLocation(geolocationOptions)

  const fetchData = async () => {
    const res = await axios.get("/api/weather");
    return res.data;
  };

  const { isLoading } = useQuery("item", fetchData, {
    onSuccess: (data) => setWeather(data)
    }
  )

  if (isLoading) return <>Loading...</>

  return (
    <>
      <div style={{ color: 'white' }}> {location ? location.latitude + ', ' +  location.longitude  : error} </div>
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