import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { useFirebase, useFirebaseUser } from 'provide-firebase-middleware';
import { writes } from '../../../firebase';

function CreateGame(props) {
  const [input, setInput] = React.useState("")
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
        writes.createGame({ 
          host: user.uid,
          name: input
        })
      }}>Submit</Button>
    </>
  )
}

export default CreateGame;