import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../../../../redux/selectors';

function GamePlayerStartMessage() {
  const isHost = useSelector(selectors.getIsUserHost)
  const allReady = useSelector(selectors.getGamePlayersAllReady)

  const message = !allReady
    ? "Waiting until all players are ready..."
    : isHost ? "Ready to start the game!" : "Waiting for host to start the game..."

  return (
    <div
      className="d-flex justify-content-center"
      style={{ position: "fixed", bottom: "20px", left: "0", right: "0" }}
    >
      <p>{message}</p>
    </div>
  )
}

export default GamePlayerStartMessage;