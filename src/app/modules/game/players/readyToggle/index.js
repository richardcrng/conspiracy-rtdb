import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { useFirebaseUserUid, useFirebaseDatabaseValue, useFirebase } from 'provide-firebase-middleware';
import { useDispatch } from 'react-redux';
import { updatePlayer } from '../../../../../redux/saga/sagas';

function GamePlayersReadyToggle() {
  const dispatch = useDispatch()
  const uid = useFirebaseUserUid()
  const isReady = useFirebaseDatabaseValue(`players/${uid}/isReady`)

  return (
    <Checkbox
      label="Ready"
      onChange={() => dispatch(updatePlayer.trigger({ key: uid, isReady: !isReady }))}
      toggle
      checked={Boolean(isReady)}
    />
  )
}

export default GamePlayersReadyToggle;