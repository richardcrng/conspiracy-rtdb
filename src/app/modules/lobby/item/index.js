import * as R from 'ramda'
import React from 'react';
import { withRouter } from 'react-router-dom';
import { MdExitToApp } from 'react-icons/md'
import { useFirebaseUser, useFirebase } from 'provide-firebase-middleware';
import { writes } from '../../../../firebase';

function LobbyItem({ id, name, players, history }) {
  const firebase = useFirebase()
  const user = useFirebaseUser()

  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <strong>{name}</strong>
      <MdExitToApp
        onClick={() => {
          if (user && user.uid && !R.prop(user.uid, players)) {
            writes.joinGame(user.uid, id, firebase)
          }
          history.push(`/game/${id}/players`)
        }}
        size={30}
      />
    </div>
  )
}

// eslint-disable-next-line no-func-assign
LobbyItem = withRouter(LobbyItem)
export default LobbyItem;