import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../../../redux/selectors';
import { Header } from 'semantic-ui-react';
import Button from '../../../../lib/atoms/Button';

function GameRoleReveal({ revealed, setRevealed }) {

  return revealed
    ? <GameRoleRevealed />
    : <GameRoleConcealed onClick={() => setRevealed(true)} />
}

function GameRoleConcealed({ onClick }) {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ position: "fixed", bottom: "120px", left: "0", right: "0" }}
    >
      <Button
        size="huge"
        color="secondary"
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
      <>
        <p>You are in a</p>
        <Header size="large">CONSPIRACY</Header>
        <p>against</p>
        <Header size="large">{victim}</Header>
      </>
    )
  } else {
    return <p>Loading...</p>
  }
}

export default GameRoleReveal;