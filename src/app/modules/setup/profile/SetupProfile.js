import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import selectors from '../../../../redux/selectors';
import { createOrSyncUserName } from '../../../../redux/saga/sagas';
import ButtonCentreBottom from '../../../lib/molecules/ButtonCentreBottom';
import { ROUTES } from '../../../constants/routes';
import Input from '../../../lib/atoms/Input';

function SetupProfile() {
  const dispatch = useDispatch()
  const name = useSelector(selectors.getUserName)
  const [newName, setNewName] = React.useState(name)

  return (
    <>
      <h1>Set username</h1>

      <Input
        label={() => <b>Name</b>}
        onChange={e => setNewName(e.target.value)}
        placeholder={name}
        value={newName}
      />
      <ButtonCentreBottom
        disabled={!newName}
        to={ROUTES.Lobby}
        onClick={() => {
          dispatch(createOrSyncUserName.trigger(newName))
        }}
      >
        Change name
      </ButtonCentreBottom>
    </>
  )
}

export default SetupProfile;