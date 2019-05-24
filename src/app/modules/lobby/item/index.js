import * as R from 'ramda'
import React from 'react';
import { MdExitToApp } from 'react-icons/md'
import { useFirebaseUser } from 'provide-firebase-middleware';
import { writes } from '../../../../firebase';

function LobbyItem({ id, name, players }) {
  const user = useFirebaseUser()

  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <strong>{name}</strong>
      <MdExitToApp
        onClick={() => {
          if (user.uid && !R.prop(user.uid, players)) {
            writes.joinGame(user.uid, id)
          }
        }}
        size={30}
      />
    </div>
  )
}

export default LobbyItem;