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

function Game({ match }) {
  const dispatch = useDispatch()
  const uid = useSelector(selectors.getUid)
  const storedGameId = useSelector(selectors.getGameId)
  const isComplete = useSelector(selectors.getGameIsComplete)
  const isStarted = useSelector(selectors.getGameIsStarted)
  
  // Set player's game Id from match
  const gameIdMatch = R.path(['params', 'gameId'], match)
  React.useEffect(() => {
    if (gameIdMatch && gameIdMatch !== storedGameId) {
      dispatch(updatePlayer.trigger({ key: uid, currentGame: gameIdMatch }))
    }
  }, [dispatch, gameIdMatch])

  // Keep Redux game players in sync with Firebase
  const gamePlayers = useGamePlayers(storedGameId)
  React.useEffect(() => {
    dispatch(actions.game.players.create.update(gamePlayers))
  }, [dispatch, gamePlayers])

  // Keep Redux game other props in sync with Firebase game
  const { players, ...rest } = useFirebaseDatabaseValue(`games/${storedGameId}`) || {}
  React.useEffect(() => {
    console.log(rest)
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