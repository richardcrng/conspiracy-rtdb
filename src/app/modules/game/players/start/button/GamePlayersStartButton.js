import React from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../../../../../../redux/saga/sagas';
import ButtonCentreBottom from '../../../../../../lib/molecules/ButtonCentreBottom';

function GamePlayersStartButton({ ready, isHost }) {
  const dispatch = useDispatch()

  return (
    <ButtonCentreBottom
      disabled={!ready || !isHost}
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