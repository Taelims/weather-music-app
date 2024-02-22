import React from 'react'
import styled from 'styled-components'
import { useGetBoardList } from '../hooks/useGetBoardList'
import { BoardInfo, BoardQuery } from '../types/hook/hookType'
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
  const BoardData: BoardQuery = useGetBoardList()
  return (
    <>
      <CardContainer>
        {
          BoardData?.data?.map((item: BoardInfo, index : number)=>(
            <CardCom item = {item}  key={index}/>
          ))
        }
      </CardContainer>
    </>
  )
}

export default Board;