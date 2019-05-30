import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import selectors from '../../../../redux/selectors';
import { createOrSyncUserName } from '../../../../redux/saga/sagas';
import { InputItem } from 'antd-mobile';
import ButtonCentreBottom from '../../../../lib/molecules/ButtonCentreBottom';

function SetupProfile() {
  const dispatch = useDispatch()
  const name = useSelector(selectors.getUserName)
  const [newName, setNewName] = React.useState(name)

  return (
    <>
      <h1>Set name</h1>

      <InputItem
        onChange={str => setNewName(str)}
        placeholder={name}
        value={newName}
      >
        Name
      </InputItem>
      <ButtonCentreBottom
        disabled={!newName}
        onClick={() => {
          dispatch(createOrSyncUserName.trigger(newName))
        }}
      >
        Create Game
      </ButtonCentreBottom>
    </>
  )
}

export default SetupProfile;