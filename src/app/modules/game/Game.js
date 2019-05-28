import * as R from 'ramda'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/leaves';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import selectors from '../../../redux/selectors';
import GamePrestart from './prestart';
import useGamePlayers from '../../../helpers/hooks/gamePlayers';
import GameOngoing from './ongoing';
import GameComplete from './complete';

function Game() {
  const dispatch = useDispatch()
  const storedGameId = useSelector(selectors.getGameId)
  const isComplete = useSelector(selectors.getGameIsComplete)
  const isStarted = useSelector(selectors.getGameIsStarted)
  
  // // Set game Id from match
  // const gameIdMatch = R.path(['params', 'gameId'], match)
  // React.useEffect(() => {
  //   if (gameIdMatch && gameIdMatch !== storedGameId) {
  //     dispatch(actions.game.id.create.update(gameIdMatch))
  //   }
  // }, [dispatch, gameIdMatch])

  // Keep Redux game players in sync with Firebase
  const gamePlayers = useGamePlayers(storedGameId)
  React.useEffect(() => {
    dispatch(actions.game.players.create.update(gamePlayers))
  }, [dispatch, gamePlayers])

  // Keep Redux game other props in sync with Firebase game
  const { players, ...rest } = useFirebaseDatabaseValue(`games/${storedGameId}`) || {}
  React.useEffect(() => {
    if (rest) dispatch(actions.game.create.assign(rest))
  }, [dispatch, rest])

  if (isComplete) {
    return <GameComplete />
  } else if (isStarted) {
    return <GameOngoing />
  } else return (
    <GamePrestart />
  )
}

export default Game;