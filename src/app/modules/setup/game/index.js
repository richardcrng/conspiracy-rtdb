import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Input } from 'semantic-ui-react';
import { useFirebaseUserUid } from 'provide-firebase-middleware';
import { createGame } from '../../../../redux/saga/sagas';

function SetupGame({ history }) {
  const dispatch = useDispatch()
  const [name, setName] = React.useState("")
  const host = useFirebaseUserUid()

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

// eslint-disable-next-line no-func-assign
SetupGame = withRouter(SetupGame)
export default SetupGame;