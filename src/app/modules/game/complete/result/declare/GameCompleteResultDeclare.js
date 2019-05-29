import React from 'react'
import { useSelector } from 'react-redux';
import selectors from '../../../../../../redux/selectors';

function GameCompleteResultDeclare() {
  const hasConspiracy = useSelector(selectors.getGameHasConspiracy)
  const victimName = useSelector(selectors.getGameVictimName)

  return hasConspiracy
    ? <p>There was a conspiracy against {victimName}!</p>
    : <p>There was no conspiracy!</p>

}

export default GameCompleteResultDeclare;