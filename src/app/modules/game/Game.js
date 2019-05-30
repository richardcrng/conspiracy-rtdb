import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../redux/selectors';
import GamePrestart from './prestart';
import GameOngoing from './ongoing';
import GameComplete from './complete';
import Lobby from '../lobby';

function Game() {
  const gameKey = useSelector(selectors.getGameKey)
  const isComplete = useSelector(selectors.getGameIsComplete)
  const isStarted = useSelector(selectors.getGameIsStarted)

  if (!gameKey) return <Lobby />
  if (isComplete) return <GameComplete />
  if (isStarted) return <GameOngoing />
  
  return <GamePrestart />
}

export default Game;