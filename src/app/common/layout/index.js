import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

function AppLayout({ children }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand>Conspiracy</Navbar.Brand>
        {/* <NavItem to={ROUTES.SetupGame} text="Create Game" /> */}
        {/* <NavItem to={ROUTES.Lobby} text="Lobby" /> */}
        {/* <NavItem to={ROUTES.Game} text="Game" /> */}
      </Navbar>
      {children}
    </>
  )
}

function NavItem({ to, text }) {
  return (
    <div className="mx-auto">
      <Link to={to} >
        <Navbar.Text>{text}</Navbar.Text>
      </Link>
    </div>
  )
}

export default AppLayout;