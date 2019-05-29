import * as R from 'ramda'
import React from 'react';
import { MdExitToApp } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { joinGame } from '../../../../redux/saga/sagas';
import selectors from '../../../../redux/selectors';

function LobbyItem({ id, name, players }) {
  const dispatch = useDispatch()
  const playerKey = useSelector(selectors.getUserKey)

  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <strong>{name}</strong>
      <MdExitToApp
        onClick={() => {
          if (playerKey && !R.prop(playerKey, players)) {
            dispatch(joinGame.trigger({ playerKey, gameKey: id }))
          }
        }}
        size={30}
      />
    </div>
  )
}

export default LobbyItem;