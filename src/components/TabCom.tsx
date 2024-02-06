import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import PlayListCom from './common/PlayListCom'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { categoryPlayListState } from '../store/atom/playListState'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'


const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, max-content));
  grid-gap: 50px;
  justify-content: center;
  padding: initial;
  //margin-top: 150px;
`;

const PlayListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
  grid-gap: 40px;
  justify-content: center;
  padding: initial;
  margin-top: 50px;
`;



function TabCom() {
  const [playList, setPlayList] = useRecoilState(categoryPlayListState)
  let [tab, setTab] = useState('exercise')

  const fetchData = async () => {
    const playListRes = await axios.get("api/v1/user/media/video", {
      params: {
        keyword: tab,
      }
    })
    return playListRes
  }

  const { isLoading } = useQuery(['fetchData' , tab], fetchData, {
    onSuccess: (data) => {
      if(data){
        setPlayList(data.data.result)
      }
    },
    onError: (err) =>{
      return console.log(err)
    },
      enabled: !!tab
    }
  )




  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <TabContainer>
          <h3>
            <Badge bg="dark" onClick={()=>{setTab('exercise')}}>운동</Badge>
          </h3>
          <h3>
            <Badge bg="dark" onClick={()=>{setTab('happy')}} >행복한기분</Badge>
          </h3>
          <h3>
            <Badge bg="dark" onClick={()=>{setTab('concentration')}} >집중</Badge>
          </h3>
          <h3>
            <Badge bg="dark" onClick={()=>{setTab('rest')}} >휴식</Badge>
          </h3>
          <h3>
            <Badge bg="dark" onClick={()=>{setTab('energe')}} >에너지</Badge>
          </h3>
          <h3>
            <Badge bg="dark" onClick={()=>{setTab('sleep')}} >잠잘 때</Badge>
          </h3>
      </TabContainer>
      <PlayListContainer>
        {
          playList.item.map((item, index)=>(
            <Link to="/playlist/category" key = {index}> <PlayListCom tab key = {index} index={index} width={15} height={15}/> </Link>
            )
          )
        }
      </PlayListContainer>
    </>
  );
}

export default TabCom;