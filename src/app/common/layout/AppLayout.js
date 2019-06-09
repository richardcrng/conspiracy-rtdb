import React from 'react';
import classes from './AppLayout.module.css';
import { IonContent } from '@ionic/react';
import AppLayoutToolbar from './toolbar';
import AppLayoutAlert from './alert';

function AppLayout({ children }) {
  return (
    <>
      <AppLayoutToolbar />
      <IonContent>
        <AppLayoutAlert />
        <div className={classes.AppLayout}>
          {children}
        </div>
      </IonContent>
    </>
  )
}

export default AppLayout;