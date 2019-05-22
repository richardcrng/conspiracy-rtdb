import React from 'react';
import { MdDone } from 'react-icons/md'

function GamePlayersItem({ name, ready }) {
  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <strong>{name}</strong>
      {ready && <MdDone size={30} />}
    </div>
  )
}

export default GamePlayersItem;