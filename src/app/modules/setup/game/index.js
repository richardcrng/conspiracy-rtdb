import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import { useFirebaseUserUid } from 'provide-firebase-middleware';
import { createGame } from '../../../../redux/saga/sagas';
import { useRouter } from '../../../providers/router/RouterProvider';

function SetupGame() {
  const dispatch = useDispatch()
  const [name, setName] = React.useState("")
  const host = useFirebaseUserUid()
  const { history } = useRouter()

  return (
    <>
      <h1>Create Game</h1>
      <Input
        onChange={(e, data) => setName(data.value)}
        placeholder="Game name"
        value={name}
      />
      <Button onClick={() => {
        dispatch(createGame.trigger({ host, name, history }))
      }}>
        Submit
      </Button>
    </>
  )
}

export default SetupGame;