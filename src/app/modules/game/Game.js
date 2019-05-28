import * as R from 'ramda'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/leaves';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import selectors from '../../../redux/selectors';
import GamePrestart from './prestart';
import useGamePlayers from '../../../helpers/hooks/gamePlayers';
import GameOngoing from './ongoing';

function Game({ match }) {
  const dispatch = useDispatch()
  const storedGameId = useSelector(selectors.getGameId)
  
  // Set game Id from match
  const gameIdMatch = R.path(['params', 'gameId'], match)
  React.useEffect(() => {
    if (gameIdMatch && gameIdMatch !== storedGameId) {
      dispatch(actions.game.id.create.update(gameIdMatch))
    }
  }, [dispatch, gameIdMatch])

  // Keep Redux host in sync with Firebase
  const host = useFirebaseDatabaseValue(`games/${storedGameId}/host`)
  React.useEffect(() => {
    if (!R.isNil(host)) {
      dispatch(actions.game.host.create.update(host))
    }
  }, [dispatch, host])

  // Keep Redux hasConspiracy in sync with Firebase
  const hasConspiracy = useFirebaseDatabaseValue(`games/${storedGameId}/hasConspiracy`)
  React.useEffect(() => {
    if (!R.isNil(hasConspiracy)) {
      dispatch(actions.game.hasConspiracy.create.update(hasConspiracy))
    }
  }, [dispatch, hasConspiracy])

  // Keep Redux victim in sync with Firebase
  const victim = useFirebaseDatabaseValue(`games/${storedGameId}/victim`)
  React.useEffect(() => {
    if (!R.isNil(victim)) {
      dispatch(actions.game.victim.create.update(victim))
    }
  }, [dispatch, victim])

  // Keep Redux game players in sync with Firebase
  const gamePlayers = useGamePlayers(storedGameId)
  React.useEffect(() => {
    dispatch(actions.game.players.create.update(gamePlayers))
  }, [dispatch, gamePlayers])

  const isStarted = useFirebaseDatabaseValue(`games/${storedGameId}/isStarted`)

  return <GameOngoing />

  if (isStarted) {
    return <GameOngoing />
  } else return (
    <GamePrestart />
  )
}

export default Game;