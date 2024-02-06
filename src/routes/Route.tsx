import { Route, Routes } from 'react-router-dom'
import React from 'react'
import UserMain from '../pages/UserMain'
import PlayListDetail from '../pages/PlayListDetail'

function ReactRoute() {
  return(
    <Routes>
      <Route path="/" element={<UserMain />} />
      <Route path="/playlist/:id" element={<PlayListDetail />} />
    </Routes>
  )
}

export default ReactRoute