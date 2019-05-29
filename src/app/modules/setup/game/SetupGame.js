import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGame } from '../../../../redux/saga/sagas';
// import { useRouter } from '../../../providers/router/RouterProvider';
import ButtonCentreBottom from '../../../../lib/molecules/ButtonCentreBottom';
import { InputItem } from 'antd-mobile';
import selectors from '../../../../redux/selectors';

function SetupGame() {
  const dispatch = useDispatch()
  const [name, setName] = React.useState("")
  const host = useSelector(selectors.getUserKey)
  // const { history } = useRouter()

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
          dispatch(createGame.trigger({
            host,
            name,
            // history
          }))
        }}
      >
        Create Game
      </ButtonCentreBottom>
    </>
  )
}

export default SetupGame;