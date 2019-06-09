import React from 'react'
import { IonAlert } from '@ionic/react';
import { useSelector } from 'react-redux';
import selectors from '../../../../redux/selectors';

function AppLayoutAlert() {

  const {
    header,
    subheader,
    message,
    isOpen,
    backdropDismiss,
    dismissPath
  } = useSelector(selectors.getUserAlert)

  return (
    <IonAlert
      {...{
        header,
        subheader,
        message,
        isOpen,
        backdropDismiss
      }}
    />
  )
}

export default AppLayoutAlert;