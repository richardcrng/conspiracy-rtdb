import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import classes from './AppLayout.module.css';
import { useFirebase, useFirebaseUser } from 'provide-firebase-middleware';
import { IonContent } from '@ionic/react';
import AppLayoutToolbar from './toolbar';

function AppLayout({ children }) {
  const user = useFirebaseUser()

  return (
    <>
      <AppLayoutToolbar />
      <IonContent>
        <div className={classes.AppLayout}>
          {children}
        </div>
      </IonContent>
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

function SignOut() {
  const firebase = useFirebase()

  return (
    <div
      className="mx-auto"
      onClick={() => firebase.auth().signOut()}
    >
      <Navbar.Text>Sign out</Navbar.Text>
    </div>
  )
}

export default AppLayout;