import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import { useFirebaseUserUid } from 'provide-firebase-middleware';
import { createGame } from '../../../../redux/saga/sagas';
import { useRouter } from '../../../providers/router/RouterProvider';
import ButtonCentreBottom from '../../../../lib/molecules/ButtonCentreBottom';

function SetupGame() {
  const dispatch = useDispatch()
  const [name, setName] = React.useState("")
  const host = useFirebaseUserUid()
  const { history } = useRouter()

  return (
    <>
      <h1>Host New Game</h1>
      <Input
        onChange={(e, data) => setName(data.value)}
        placeholder="Game name"
        value={name}
      />
      <div className="CenterBottom">
        <ButtonCentreBottom onClick={() => {
          dispatch(createGame.trigger({ host, name, history }))
        }}>
          Submit
      </ButtonCentreBottom>
      </div>
    </>
  )
}

export default SetupGame;