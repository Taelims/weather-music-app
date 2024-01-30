import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import axios from 'axios'
import { itemState } from '../store/atom/itemState'
import CardCom from '../components/CardCom'
import { useQuery } from 'react-query'
import WeatherCom from '../components/WeatherCom'
import PlayListCom from '../components/PlayListCom'


const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  grid-gap: 30px;
  justify-content: center;
  padding: initial;
  margin-top: 50px;
`;

const WeatherBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  grid-gap: 70px;
  justify-content: center;
  padding: initial;
  margin-top: 50px;
`;

const SecondWeatherBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  grid-gap: 50px;
  justify-content: center;
  padding: initial;
  margin-top: 50px;
`;

interface StateInfo {
  id: string;
  title: string;
  subTitle: string;
  text: string;
}


function App() {
  const [items, setItems] = useRecoilState<StateInfo[]>(itemState)

  const fetchData = async () => {
    const res = await axios.get("/api/data");
    return res.data;
  };

  const { isLoading } = useQuery("item", fetchData, {
    onSuccess: (data) => setItems(data)
    }
  )

  if (isLoading) return <>Loading...</>

  return (
    <>

      <WeatherBoxContainer>
        <WeatherCom/>
        <PlayListCom width={20} height={20}/>
      </WeatherBoxContainer>

      <SecondWeatherBoxContainer>
        <PlayListCom width={15} height={15}/>
        <PlayListCom width={15} height={15}/>
        <PlayListCom width={15} height={15}/>
      </SecondWeatherBoxContainer>

      <CardContainer>
        {
          items.map((item, index)=>(
            <CardCom item = {item}  key={index}/>
          ))
        }
      </CardContainer>
    </>
  )
}

export default App;