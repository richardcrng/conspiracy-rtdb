import React from 'react'
import { useSelector } from 'react-redux';
import selectors from '../../../../redux/selectors';

function GameModerator() {
  const allVoting = useSelector(selectors.getGamePlayersAllVoting)

  if (allVoting) {
    console.log("FREEZE VOTING")
  } else {
    console.log("unfreeze")
  }

  return null
}

export default GameModerator;