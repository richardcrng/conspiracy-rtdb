import React from 'react'
import { IonToolbar, IonButtons, IonButton, IonTitle, IonIcon } from '@ionic/react';
import { useRouter } from '../../../providers/router/RouterProvider';
import { ROUTES } from '../../../constants/routes';

function AppLayoutToolbar() {
  const { history } = useRouter()

  return (
    <IonToolbar color="dark">
      <IonButtons slot="start">
        <IonButton onClick={() => history.goBack()}>
          <IonIcon slot="icon-only" name="arrow-back" />
        </IonButton>
      </IonButtons>
      <IonButtons slot="end">
        <IonButton onClick={() => history.push(ROUTES.Profile)}>
          <IonIcon slot="icon-only" name="contact" />
        </IonButton>
      </IonButtons>
      <IonTitle>Conspiracy</IonTitle>
    </IonToolbar>
  )
}

export default AppLayoutToolbar