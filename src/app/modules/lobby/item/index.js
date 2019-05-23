import React from 'react';
import { MdExitToApp } from 'react-icons/md'
import { useFirebaseUser, useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import { references } from '../../../../firebase';

function LobbyItem({ id, name, players }) {
  const user = useFirebaseUser()
  console.log(players)

  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <strong>{name}</strong>
      <MdExitToApp
        onClick={() => {
          if (user.uid && !players.includes(user.uid)) {
            references.getPlayersByGameId(id).push(user.uid)
          }
        }}
        size={30}
      />
    </div>
  )
}

export default LobbyItem;