import React from 'react';
import { MdDone } from 'react-icons/md'

function GamePlayersItem({ name, isReady, connections }) {
  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <strong>{name}</strong>
      {isReady && connections && <MdDone size={30} />}
    </div>
  )
}

export default GamePlayersItem;