import * as R from 'ramda'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/leaves';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import selectors from '../../../redux/selectors';
import GamePrestart from './prestart';
import useGamePlayers from '../../../helpers/hooks/gamePlayers';

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

  // Keep Redux hasConspiracy in sync with Firebase
  const hasConspiracy = useFirebaseDatabaseValue(`games/${storedGameId}/hasConspiracy`)
  React.useEffect(() => {
    if (!R.isNil(hasConspiracy)) {
      dispatch(actions.hasConspiracy.create.update(hasConspiracy))
    }
  }, [dispatch, hasConspiracy])

  // Keep Redux game players in sync with Firebase
  const gamePlayers = useGamePlayers(storedGameId)
  React.useEffect(() => {
    dispatch(actions.game.players.create.update(gamePlayers))
  }, [dispatch, gamePlayers])

  const isStarted = useFirebaseDatabaseValue(`games/${storedGameId}/isStarted`)

  if (isStarted) {
    return <div>Started this game already</div>
  } else return (
    <GamePrestart />
  )
}

export default Game;