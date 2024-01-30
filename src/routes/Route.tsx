import { Route, Routes } from 'react-router-dom'

import React from 'react'
import UserMain from '../pages/UserMain'

function ReactRoute() {
  return(
    <Routes>
      <Route path="/" element={<UserMain />} />
    </Routes>
  )
}

export default ReactRoute