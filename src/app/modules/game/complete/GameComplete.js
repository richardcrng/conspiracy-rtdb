import React from 'react'
import GameCompleteResult from './result';
import ButtonCentreBottom from '../../../lib/molecules/ButtonCentreBottom';

function GameComplete() {
  const [viewResult, setViewResult] = React.useState(false)

  return (
    <>
      <h1>Game complete</h1>
      {!viewResult && (
        <ButtonCentreBottom text="View result" onClick={() => setViewResult(true)} />
      )}
      {viewResult && <GameCompleteResult />}
    </>
  )
}

export default GameComplete;