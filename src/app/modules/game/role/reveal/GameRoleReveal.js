import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../../../redux/selectors';
import { Button } from 'semantic-ui-react';

function GameRoleReveal() {
  const [viewing, setViewing] = React.useState(false)

  return viewing
    ? <GameRoleRevealed />
    : <GameRoleConcealed onClick={() => setViewing(true)} />
}

function GameRoleConcealed({ onClick }) {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ position: "fixed", bottom: "120px", left: "0", right: "0" }}
    >
      <Button
        size="big"
        secondary
        onClick={onClick}
      >
        Reveal role
      </Button>
    </div>
  )
}

function GameRoleRevealed() {
  const isInnocent = useSelector(selectors.getIsUserInnocent)
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