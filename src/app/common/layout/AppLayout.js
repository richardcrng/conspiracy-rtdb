import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import classes from './AppLayout.module.css';

function AppLayout({ children }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" >
        <Link to="/"><Navbar.Brand>Conspiracy</Navbar.Brand></Link>
        <NavItem to={ROUTES.SetupProfile} text="Change name" />
        {/* <NavItem to={ROUTES.Lobby} text="Lobby" /> */}
        {/* <NavItem to={ROUTES.Game} text="Game" /> */}
      </Navbar>
      <div className={classes.AppLayout}>
        {children}
      </div>
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