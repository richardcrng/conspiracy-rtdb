import React from 'react';
import { useFirebaseUserUid, useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import { Button } from 'semantic-ui-react';

function GameRole() {
  const uid = useFirebaseUserUid()
  const name = useFirebaseDatabaseValue(`/players/${uid}/name`)

  return (
    <div>
      <p style={{ fontSize: "120%", fontWeight: "bold" }}>{name}</p>
      <Button>View Role</Button>
    </div>
  )
}

export default GameRole;