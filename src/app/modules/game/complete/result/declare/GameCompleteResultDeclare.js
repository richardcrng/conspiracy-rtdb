import React from 'react'
import { useSelector } from 'react-redux';
import selectors from '../../../../../../redux/selectors';

function GameCompleteResultDeclare() {
  const hasConspiracy = useSelector(selectors.getGameHasConspiracy)
  const victimName = useSelector(selectors.getGameVictimName)

  return (
    <div style={{ fontSize: "18px", fontStyle: "strong" }}>
      {
        hasConspiracy
          ? <p>There was a <b>conspiracy</b> against <b>{victimName}</b>!</p>
          : <p>There was no conspiracy!</p>
      }
    </div>
  )
}

export default GameCompleteResultDeclare;