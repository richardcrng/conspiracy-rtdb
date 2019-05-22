import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppLayout({ children }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand>App</Navbar.Brand>
        <NavItem to="/create-game" text="Create Game" />
        <NavItem to="/lobby" text="Lobby" />
        <NavItem to="/sign-in" text="Sign In" />
      </Navbar>
      {children}
    </>
  )
}

function NavItem({ to, text }) {
  return (
    <div className="mx-auto">
      <Link to="/lobby" >
        <Navbar.Text>{text}</Navbar.Text>
      </Link>
    </div>
  )
}

export default AppLayout;