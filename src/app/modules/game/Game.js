import * as R from 'ramda'
import React from 'react';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/leaves';
import selectors from '../../../redux/selectors';
import GamePrestart from './prestart';
import useGamePlayers from '../../../helpers/hooks/gamePlayers';
import GameOngoing from './ongoing';
import GameComplete from './complete';
import { updatePlayer } from '../../../redux/saga/sagas';

function Game() {
  const isComplete = useSelector(selectors.getGameIsComplete)
  const isStarted = useSelector(selectors.getGameIsStarted)

  if (isComplete) {
    return <GameComplete />
  } else if (isStarted) {
    return <GameOngoing />
  } else return (
    <GamePrestart />
  )
}

export default Game;