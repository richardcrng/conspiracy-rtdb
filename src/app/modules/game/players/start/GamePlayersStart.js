import * as R from 'ramda'
import React from 'react';
import { useStateHandlers } from 'provide-firebase-middleware';
import GamePlayerStartMessage from './message';
import GamePlayersStartButton from './button';

function GamePlayersStart({ gamePlayers }) {  
  // playersReady is boolean based on gamePlayers' isReady props
  const [playersReady, { set: setPlayersReady }] = useStateHandlers(false)
  React.useEffect(() => {
    // Check if every gamePlayer isReady and has connections
    const gamePlayersReady = R.all(
      R.both(R.prop('isReady'), R.prop('connections')),
      Object.values(gamePlayers)
    )
    setPlayersReady(gamePlayersReady)
  }, [gamePlayers, setPlayersReady])

  return (
    <>
      <GamePlayerStartMessage ready={playersReady} />
      <GamePlayersStartButton ready={playersReady} />
    </>
  )
}

export default GamePlayersStart;