import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import PlayListCom from '../common/PlayListCom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useGetCategoryVideo } from '../../hooks/useGetCategoryVideo'
import { VideoItemType } from '../../types/components/PlayListComType'
import { VideoQueryType } from '../../types/hook/HookType'


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
  let [tab, setTab] = useState<string>('exercise')
  const categoryVideoData: VideoQueryType = useGetCategoryVideo(tab)

  if (categoryVideoData.isLoading) return <div>Loading...</div>;

  return (
    categoryVideoData && <>
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
      <Link to={`/playlist/${tab}`} >
      <PlayListContainer>
        {
          categoryVideoData.data &&
          categoryVideoData.data.map((item : VideoItemType, index: number)=>(
             <PlayListCom data = {categoryVideoData.data} key = {index} idx={index} width={15} height={15}/>
            )
          )
        }
      </PlayListContainer>
      </Link>
    </>
  );
}

export default TabCom;