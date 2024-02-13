import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ModalCom from './ModalCom'


function NavBarCom() {
  const [show, setShow] = useState<boolean>(false);
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
            {/*<Nav.Link className="text-white" onClick={()=>setShow(true)}>새 글 쓰기</Nav.Link>*/}
            <Nav.Link className="text-white" eventKey={2} href="#memes">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ModalCom
        show={show}
        onHide={()=>{setShow(false)}}
      />
    </Navbar>
  );
}

export default NavBarCom;