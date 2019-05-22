import React from 'react';
import { Navbar } from 'react-bootstrap';

function AppLayout({ children }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand>App</Navbar.Brand>
      </Navbar>
      {children}
    </>
  )
}

export default AppLayout;