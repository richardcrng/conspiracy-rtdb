import React from 'react';
import { MdDone } from 'react-icons/md'
import GamePlayersItemKick from './kick';

function GamePlayersItem({ id, name, isReady, connections }) {
  
  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <p><strong>{name}</strong></p>
      <span>
        {/* Don't depend on connections - can't fully control yet */}
        {isReady && <MdDone size={30} />}
        <GamePlayersItemKick id={id} />
      </span>
    </div>
  )
}

export default GamePlayersItem;