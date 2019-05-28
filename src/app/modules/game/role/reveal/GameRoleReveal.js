import React from 'react';
import useCurrentPlayerIsInnocent from '../../../../../helpers/hooks/currentPlayerIsInnocent';
import { useSelector } from 'react-redux';
import selectors from '../../../../../redux/selectors';
import { Button } from 'semantic-ui-react';

function GameRoleReveal() {
  const [viewing, setViewing] = React.useState(false)

  return viewing
    ? <GameRoleRevealed />
    : <Button onClick={() => setViewing(true)}>REVEAL</Button>
}

function GameRoleRevealed() {
  const isInnocent = useCurrentPlayerIsInnocent()
  const hasConspiracy = useSelector(selectors.getGameHasConspiracy)
  const victim = useSelector(selectors.getGameVictimName)

  if (isInnocent) {
    return (
      <p>You are innocent!</p>
    )
  } else if (hasConspiracy) {
    return (
      <p>You are in a conspiracy against {victim}!</p>
    )
  } else {
    return <p>Loading...</p>
  }
}

export default GameRoleReveal;