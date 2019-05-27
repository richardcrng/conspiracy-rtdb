import React from 'react';

function GamePlayerStartMessage({ ready }) {
  return ready
    ? <p>All players are ready to start!</p>
    : <p>Waiting for players to be ready...</p>
}

export default GamePlayerStartMessage;