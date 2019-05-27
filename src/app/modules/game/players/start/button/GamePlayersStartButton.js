import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { startGame } from '../../../../../../redux/saga/sagas';

function GamePlayersStartButton({ ready }) {
  const dispatch = useDispatch()

  return (
    <Button
      primary
      disabled={!ready}
      onClick={() => {
        if (ready) {
          dispatch(startGame.trigger())
        }
      }}
    >
      Start
    </Button>
  )
}

export default GamePlayersStartButton;