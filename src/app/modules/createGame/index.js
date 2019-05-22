import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { randomUid } from '../../../helpers/utils/keys';
import { useFirebase, useFirebaseUser } from 'provide-firebase-middleware';

function CreateGame(props) {
  const firebase = useFirebase()
  const [input, setInput] = React.useState("")
  const [key] = React.useState(randomUid())
  const user = useFirebaseUser()

  
  return (
    <>
      <h1>Create Game</h1>
      <Input
        onChange={(e, data) => setInput(data.value)}
        placeholder="Game name"
        value={input}
      />
      <Button onClick={() => {
        const hostId = user.uid

        // Create game in database
        firebase.database().ref(`games/${key}`).update({
          key,
          host: hostId,
          isInSignups: true,
          players: [hostId]
        })

        // Update host
        firebase.database().ref(`players/${hostId}`).update({
          currentGame: key,
          isHost: true
        })
      }}>Submit</Button>
    </>
  )
}

export default CreateGame;