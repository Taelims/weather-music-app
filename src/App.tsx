import React from 'react'
import './App.css';
import NavBarCom from './components/common/NavBarCom'
import 'bootstrap/dist/css/bootstrap.css';
import ReactRoute from './routes/Route'
import GlobalStyles from './GlobalStyles'


function App() {
  return (
    <>
      <NavBarCom/>
      <ReactRoute/>
      <GlobalStyles />
    </>
  );
}

export default App;
