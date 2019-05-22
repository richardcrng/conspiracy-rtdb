import React from 'react';
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function AppLayout({ children }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand>App</Navbar.Brand>
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
      <LinkContainer to="/lobby" >
        <Navbar.Text>{text}</Navbar.Text>
      </LinkContainer>
    </div>
  )
}

export default AppLayout;