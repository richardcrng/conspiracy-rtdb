import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { randomUid } from '../../../helpers/utils/keys';
import { useFirebase, useFirebaseUser } from 'provide-firebase-middleware';
import { references, writes } from '../../../firebase';

function CreateGame(props) {
  const firebase = useFirebase()
  const [input, setInput] = React.useState("")
  const [createdKey] = React.useState(randomUid())
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
        const host = user.uid

        // Create game in database
        writes.createGame({ 
          key: createdKey,
          host,
          name: input
        })

        // Update host
        writes.updatePlayer({
          key: host,
          currentGame: createdKey,
          isHost: true
        })
      }}>Submit</Button>
    </>
  )
}

export default CreateGame;