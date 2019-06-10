import React from 'react'
import { IonAlert } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import selectors from '../../../../redux/selectors';
import { closeAlert } from '../../../../redux/saga/sagas';

function AppLayoutAlert() {
  const dispatch = useDispatch()

  const {
    header,
    subheader,
    message,
    buttons,
    isOpen,
    backdropDismiss = true,
    // dismissPath
  } = useSelector(selectors.getUserAlert) || {}

  return (
    <IonAlert
      onDidDismiss={() => {
        dispatch(closeAlert.trigger())
      }}
      {...{
        header,
        subheader,
        message,
        buttons,
        isOpen,
        backdropDismiss
      }}
    />
  )
}

export default AppLayoutAlert;