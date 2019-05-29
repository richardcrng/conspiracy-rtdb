import React from 'react';
import { useDispatch } from 'react-redux';
import { useFirebaseUserUid } from 'provide-firebase-middleware';
import { createGame } from '../../../../redux/saga/sagas';
import { useRouter } from '../../../providers/router/RouterProvider';
import ButtonCentreBottom from '../../../../lib/molecules/ButtonCentreBottom';
import { InputItem } from 'antd-mobile';

function SetupGame() {
  const dispatch = useDispatch()
  const [name, setName] = React.useState("")
  const host = useFirebaseUserUid()
  const { history } = useRouter()

  return (
    <>
      <h1>Host New Game</h1>
      <div className="d-flex justify-content-center mx-auto" style={{ position: "fixed", bottom: "150px", width: "100%" }}>
        
      </div>

      <InputItem
        onChange={str => setName(str)}
        placeholder="Name your game"
        value={name}
      >
        Name
      </InputItem>
      <ButtonCentreBottom
        disabled={!name}
        onClick={() => {
          dispatch(createGame.trigger({ host, name, history }))
        }}
      >
        Create Game
      </ButtonCentreBottom>
    </>
  )
}

export default SetupGame;