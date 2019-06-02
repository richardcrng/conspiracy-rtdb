import React from 'react'
import ButtonCentreBottom from '../../../../lib/molecules/ButtonCentreBottom';
import { useDispatch, useSelector } from 'react-redux';
import selectors from '../../../../../redux/selectors';
import { createGame } from '../../../../../redux/saga/sagas';
import Input from '../../../../lib/atoms/Input';

function SetupGameForm() {
  const dispatch = useDispatch()
  const [name, setName] = React.useState("")
  const host = useSelector(selectors.getUserKey)

  return (
    <>
      <Input
        label={() => <b>Name</b>}
        onChange={e => setName(e.target.value)}
        placeholder="Name your game here"
        value={name}
      />
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

export default SetupGameForm;