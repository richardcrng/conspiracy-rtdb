import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGame } from '../../../../redux/saga/sagas';
import ButtonCentreBottom from '../../../lib/molecules/ButtonCentreBottom';
import selectors from '../../../../redux/selectors';
import LinkButton from '../../../lib/molecules/LinkButton';
import { ROUTES } from '../../../constants/routes';
import { IonInput, IonLabel } from '@ionic/react';
import SetupGameForm from './form';

function SetupGame() {
  // const dispatch = useDispatch()
  // const [name, setName] = React.useState("")
  // const host = useSelector(selectors.getUserKey)

  return (
    <>
      <h1>Host New Game</h1>
      <div className="mb-3">
        <LinkButton
          fill="outline"
          text="Back to lobby"
          to={ROUTES.Lobby}
        />
      </div>
      <SetupGameForm />
    </>
  )
}

export default SetupGame;