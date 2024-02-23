import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ModalCom from './ModalCom'
import { useRecoilState } from 'recoil'
import { userState } from '../../store/atom/userState'
import { UserState } from '../../types/state/stateType'
import { Badge } from 'react-bootstrap'
import { modalState } from '../../store/atom/modalState'
import BoardDetailModal from '../board/BoardDetailModal'


function NavBarCom() {
  const [signModalShow, setSignModalShow] = useRecoilState<boolean>(modalState)
  const [boardModalShow, setBoardModalShow] = useState<boolean>(false)
  const [formType, setFormType] = useState<string>('');
  const [user, setUser] = useRecoilState<UserState>(userState);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({
      id : '' ,
      playList: []
    })
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand className="text-white" as={Link} to="/">WeatherPli</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to='/board' style={{color : 'white', margin: 'auto' }} >Pli Board</Link>
            {
              location.pathname === '/board' &&
              <Nav.Link className="text-white" onClick={()=>{ return setBoardModalShow(true)}} >
              새 글쓰기
              </Nav.Link>
            }
          </Nav>

          <Nav>
            {
              !user?.id
                ?
                <>
                  <Nav.Link className="text-white" onClick={()=>{ return setSignModalShow(true), setFormType('login') }}>
                    Login
                  </Nav.Link>
                  <Nav.Link className="text-white" onClick={()=>{ return setSignModalShow(true), setFormType('create') }}>
                    Create Account
                  </Nav.Link>
                </>
                :
                <>
                  <h4> <Badge style={{margin: '5px'}} bg="light" text="dark">{user.id}</Badge> </h4>
                  <Nav.Link className="text-white" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ModalCom
        signModalShow={signModalShow}
        formType= {formType}
        onHide={()=>{setSignModalShow(false)}}
      />
      <BoardDetailModal
        boardModalShow={boardModalShow}
        onHide={()=>{setBoardModalShow(false)}}
      />
    </Navbar>
  );
}

export default NavBarCom;