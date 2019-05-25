import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { useFirebaseUserUid, useFirebaseDatabaseValue, useFirebase } from 'provide-firebase-middleware';
import { writes } from '../../../../firebase';

function GamePlayersReadyToggle() {
  const firebase = useFirebase()
  const uid = useFirebaseUserUid()
  const isReady = useFirebaseDatabaseValue(`players/${uid}/isReady`)

  return (
    <Checkbox
      label="Ready"
      onChange={() => writes.updatePlayer({ key: uid, isReady: !isReady }, firebase)}
      toggle
      checked={Boolean(isReady)}
    />
  )
}

export default GamePlayersReadyToggle;