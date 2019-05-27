import * as R from 'ramda'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/leaves';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import selectors from '../../../redux/selectors';
import GamePrestart from './prestart';

function Game({ match }) {
  const gameIdMatch = R.path(['params', 'gameId'], match)

  // Set game Id to match
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (gameIdMatch) dispatch(actions.currentGame.create.update(gameIdMatch))
  }, [dispatch, gameIdMatch])

  const storedGameId = useSelector(selectors.getCurrentGame)
  const isStarted = useFirebaseDatabaseValue(`games/${storedGameId}/isStarted`)

  if (isStarted) {
    return <div>Started this game already</div>
  } else return (
    <GamePrestart />
  )
}

export default Game;