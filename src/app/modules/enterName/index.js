import React from 'react';
import { useFirebaseUser, useFirebase } from 'provide-firebase-middleware';
import { Button, Input } from 'semantic-ui-react';
import { writes } from '../../../firebase';

function EnterName(props) {
  const firebase = useFirebase()
  const user = useFirebaseUser()
  const [input, setInput] = React.useState("")

  const name = user && user.displayName
    ? user.displayName
    : 'anonymous'

  return (
    <>
      <div>Enter your name, {name}</div>
      <Input
        onChange={(e, data) => setInput(data.value)}
        value={input}
      />
      <Button onClick={() => {
        user.updateProfile({
          displayName: input
        })

        writes.updatePlayer({
          key: user.uid,
          name: input
        }, firebase)
      }}>Submit</Button>
    </>
  )
}

export default EnterName;