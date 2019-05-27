import React from 'react';
import { useFirebaseUser } from 'provide-firebase-middleware';
import { Button, Input } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { updatePlayer } from '../../../../redux/saga/sagas';

function SetupName(props) {
  const dispatch = useDispatch()
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
        dispatch(updatePlayer.trigger({ key: user.uid, name: input }))
      }}>Submit</Button>
    </>
  )
}

export default SetupName;