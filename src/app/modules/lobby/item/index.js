import * as R from 'ramda'
import React from 'react';
import { MdExitToApp } from 'react-icons/md'
import { useFirebaseUserUid } from 'provide-firebase-middleware';
import { useDispatch } from 'react-redux';
import { joinGame } from '../../../../redux/saga/sagas';

function LobbyItem({ id, name, players }) {
  const dispatch = useDispatch()
  const uid = useFirebaseUserUid()

  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <strong>{name}</strong>
      <MdExitToApp
        onClick={() => {
          if (uid && !R.prop(uid, players)) {
            dispatch(joinGame.trigger({ playerKey: uid, gameKey: id }))
          }
        }}
        size={30}
      />
    </div>
  )
}

export default LobbyItem;