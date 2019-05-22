import React from 'react';
import { useFirebaseContext, useFirebaseUser } from '../../../helpers/provide-firebase-middleware';
import { Button, Input } from 'semantic-ui-react';

function EnterName(props) {
  const firebase = useFirebaseContext()
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
      }}>Submit</Button>
    </>
  )
}

export default EnterName;