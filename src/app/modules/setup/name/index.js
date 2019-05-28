import React from 'react';
import { useFirebaseUser } from 'provide-firebase-middleware';
import { Button, Input } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { updatePlayer } from '../../../../redux/saga/sagas';
import { useRouter } from '../../../providers/router/RouterProvider';

function SetupName(props) {
  const dispatch = useDispatch()
  const user = useFirebaseUser()
  const [input, setInput] = React.useState("")
  const { history } = useRouter()

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
        history.push('/lobby')
      }}>Submit</Button>
    </>
  )
}
export default SetupName;