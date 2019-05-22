import React from 'react';
import useFirebaseCurrentUser from '../../../helpers/hooks/firebase/currentUser';
import { useFirebaseContext } from 'provide-firebase-middleware';
import { Button, Input } from 'semantic-ui-react';

function EnterName(props) {
  const firebase = useFirebaseContext()
  const user = useFirebaseCurrentUser()
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