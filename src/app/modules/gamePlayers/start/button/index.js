import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { useFirebase } from 'provide-firebase-middleware';
import { writes } from '../../../../../firebase';
import selectors from '../../../../../redux/selectors';

function GamePlayersStartButton({ ready }) {
  const firebase = useFirebase()
  const currentGame = useSelector(selectors.getCurrentGame)

  return (
    <Button
      primary
      disabled={!ready}
      onClick={() => {
        if (ready) {
          writes.updateGame({
            key: currentGame,
            isStarted: true
          }, firebase)
        }
      }}
    >
      Start
    </Button>
  )
}

export default GamePlayersStartButton;