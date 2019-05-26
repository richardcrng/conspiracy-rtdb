import React from 'react';
import { MdDone } from 'react-icons/md'
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';

function GamePlayersItem({ id }) {
  const name = useFirebaseDatabaseValue(`/players/${id}/name`)
  const ready = useFirebaseDatabaseValue(`players/${id}/isReady`)
  const connections = useFirebaseDatabaseValue(`players/${id}/connections`)

  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <strong>{name}</strong>
      {ready && connections && <MdDone size={30} />}
    </div>
  )
}

export default GamePlayersItem;