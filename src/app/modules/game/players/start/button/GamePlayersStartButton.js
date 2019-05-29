import React from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../../../../../../redux/saga/sagas';
import ButtonCentreBottom from '../../../../../../lib/molecules/ButtonCentreBottom';

function GamePlayersStartButton({ ready }) {
  const dispatch = useDispatch()

  return (
    <ButtonCentreBottom
      disabled={!ready}
      onClick={() => {
        if (ready) {
          dispatch(startGame.trigger())
        }
      }}
    >
      Start
    </ButtonCentreBottom>
  )
}

export default GamePlayersStartButton;