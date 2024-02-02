import React from 'react';
import './App.css';
import NavBarCom from './components/common/NavBarCom'
import { RecoilRoot } from 'recoil'
import 'bootstrap/dist/css/bootstrap.css';
import ReactRoute from './routes/Route'
import GlobalStyles from './GlobalStyles'


function App() {
  return (
    <>
      <RecoilRoot>
        <NavBarCom/>
        <ReactRoute/>
        <GlobalStyles />
      </RecoilRoot>
    </>
  );
}

export default App;
