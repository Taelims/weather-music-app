import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ModalCom from './ModalCom'
import { useAuth } from '../../hooks/useAuth'


function NavBarCom() {
  const [show, setShow] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>('');
  const { data, isLoading, isError } = useAuth();

  console.log(data)


  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand className="text-white" as={Link} to="/">WeatherPli</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-white" href="#features">Features</Nav.Link>
            <Nav.Link className="text-white" href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            {
              data?.message === undefined
                ?
                <Nav.Link className="text-white" onClick={()=>{ return setShow(true), setFormType('login') }}>
                  Login
                </Nav.Link>
                :
                <Nav.Link className="text-white" onClick={()=>{ localStorage.removeItem('token')  }}>
                  Logout
                </Nav.Link>
            }
            <Nav.Link className="text-white" onClick={()=>{ return setShow(true), setFormType('create') }}>
              Create Account
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ModalCom
        show={show}
        formType= {formType}
        onHide={()=>{setShow(false)}}
      />
    </Navbar>
  );
}

export default NavBarCom;