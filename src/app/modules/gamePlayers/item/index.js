import React from 'react';
import { MdDone } from 'react-icons/md'
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';

function GamePlayersItem({ id, ready }) {
  const name = useFirebaseDatabaseValue(`/players/${id}/name`)

  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <strong>{name}</strong>
      {ready && <MdDone size={30} />}
    </div>
  )
}

export default GamePlayersItem;