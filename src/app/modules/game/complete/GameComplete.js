import React from 'react'
import GameCompleteResult from './result';
import { Button } from 'semantic-ui-react';

function GameComplete() {
  const [viewResult, setViewResult] = React.useState(false)

  return (
    <>
      <h1>Game complete</h1>
      {!viewResult && <GameCompleteView onClick={() => setViewResult(true)} />}
      {viewResult && <GameCompleteResult />}
    </>
  )
}

function GameCompleteView({ onClick }) {
  return (
    <Button primary onClick={onClick}>
      View result
    </Button>
  )
}

export default GameComplete;