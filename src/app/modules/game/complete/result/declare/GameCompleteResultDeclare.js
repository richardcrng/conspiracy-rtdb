import React from 'react'
import { useSelector } from 'react-redux';
import selectors from '../../../../../../redux/selectors';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware/dist/hooks';

function GameCompleteResultDeclare() {
  const gameId = useSelector(selectors.getGameId)
  const hasConspiracy = useFirebaseDatabaseValue(`games/${gameId}/hasConspiracy`)
  const victimId = useFirebaseDatabaseValue(`games/${gameId}/victim`)
  const victimName = useFirebaseDatabaseValue(`players/${victimId}/name`)

  return hasConspiracy
    ? <p>There was a conspiracy against {victimName}!</p>
    : <p>There was no conspiracy!</p>

}

export default GameCompleteResultDeclare;