import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../redux/selectors';
import GamePrestart from './prestart';
import GameOngoing from './ongoing';
import GameComplete from './complete';

function Game() {
  const isComplete = useSelector(selectors.getGameIsComplete)
  const isStarted = useSelector(selectors.getGameIsStarted)

  if (isComplete) return <GameComplete />
  if (isStarted) return <GameOngoing />
  
  return <GamePrestart />
}

export default Game;