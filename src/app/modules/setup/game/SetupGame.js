import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGame } from '../../../../redux/saga/sagas';
import ButtonCentreBottom from '../../../lib/molecules/ButtonCentreBottom';
import { InputItem } from 'antd-mobile';
import selectors from '../../../../redux/selectors';
import LinkButton from '../../../lib/molecules/LinkButton';
import { ROUTES } from '../../../constants/routes';

function SetupGame() {
  const dispatch = useDispatch()
  const [name, setName] = React.useState("")
  const host = useSelector(selectors.getUserKey)

  return (
    <>
      <h1>Host New Game</h1>
      <div className="mb-3">
        <LinkButton to={ROUTES.Lobby} text="Back to lobby" />
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
          }))
        }}
      >
        Create Game
      </ButtonCentreBottom>
    </>
  )
}

export default SetupGame;