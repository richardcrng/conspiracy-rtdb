import React from 'react';
import classes from './AppLayout.module.css';
import { IonContent } from '@ionic/react';
import AppLayoutToolbar from './toolbar';

function AppLayout({ children }) {
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

export default AppLayout;