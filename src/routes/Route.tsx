import { Route, Routes } from 'react-router-dom'
import React from 'react'
import UserMain from '../pages/UserMain'
import PlayListDetail from '../pages/PlayListDetail'
import Board from '../pages/Board'

function ReactRoute() {
  return(
    <Routes>
      <Route path="/" element={<UserMain />} />
      <Route path="/playlist/:id" element={<PlayListDetail />} />
      <Route path="/:board" element={<Board />} />
    </Routes>
  )
}

export default ReactRoute