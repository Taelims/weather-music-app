import React from 'react'
import styled from 'styled-components'
import { useGetBoardList } from '../hooks/useGetBoardList'
import { BoardItemType, BoardQueryType } from '../types/hook/HookType'
import CardCom from '../components/common/CardCom'

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  grid-gap: 30px;
  justify-content: center;
  padding: initial;
  margin-top: 50px;
`;



function Board() {
  const BoardData: BoardQueryType = useGetBoardList()
  return (
    <>
      <CardContainer>
        {
          BoardData?.data?.map((item: BoardItemType, index : number)=>(
            <CardCom item = {item}  key={index}/>
          ))
        }
      </CardContainer>
    </>
  )
}

export default Board;