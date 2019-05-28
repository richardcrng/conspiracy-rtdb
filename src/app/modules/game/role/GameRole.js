import React from 'react';
import useCurrentPlayerName from '../../../../helpers/hooks/currentPlayerName';
import GameRoleReveal from './reveal';

function GameRole() {
  const name = useCurrentPlayerName()

  return (
    <div>
      <p style={{ fontSize: "120%", fontWeight: "bold" }}>{name}</p>
      <GameRoleReveal />
    </div>
  )
}

export default GameRole;