import * as R from 'ramda'
import React from 'react';
import { useFirebaseDatabaseValue, useStateHandlers } from 'provide-firebase-middleware';

function GamePlayersStart({ players = [] }) {
  const allPlayers = useFirebaseDatabaseValue('players')

  const [gamePlayers, { set: setGamePlayers }] = useStateHandlers([])

  React.useEffect(() => {
    setGamePlayers(players.map(playerKey => R.prop(playerKey, allPlayers)))
  }, [allPlayers, players])

  const [playersReady, { set: setPlayersReady }] = useStateHandlers(false)

  React.useEffect(() => {
    const gamePlayersReady = R.all(
      R.prop('isReady'),
      gamePlayers
    )
    setPlayersReady(gamePlayersReady)
  }, [gamePlayers, setPlayersReady])

  return playersReady
    ? <p>All players ready!</p>
    : <p>Still waiting for someone...</p>
}

export default GamePlayersStart;