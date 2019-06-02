import React from 'react'
import { IonLabel, IonInput } from '@ionic/react';
import ButtonCentreBottom from '../../../../lib/molecules/ButtonCentreBottom';
import { useDispatch, useSelector } from 'react-redux';
import selectors from '../../../../../redux/selectors';
import { createGame } from '../../../../../redux/saga/sagas';

function SetupGameForm() {
  const dispatch = useDispatch()
  const [name, setName] = React.useState("")
  const host = useSelector(selectors.getUserKey)

  return (
    <>
      <IonInput
        onIonChange={e => setName(e.target.value)}
        placeholder="Name your game here"
        value={name}
      >
        <IonLabel><b>Name</b></IonLabel>
      </IonInput>
      <ButtonCentreBottom
        disabled={!name}
        onClick={() => {
          dispatch(createGame.trigger({
            host,
            name,
          }))
        }}
      >
        Create Game
      </ButtonCentreBottom>
    </>
  )
}

export default SetupGameForm;