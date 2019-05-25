import * as R from 'ramda'
import React from 'react';
import { useFirebaseDatabaseValue, useStateHandlers } from 'provide-firebase-middleware';

function GamePlayersStart({ players = [] }) {
  const allPlayers = useFirebaseDatabaseValue('players')

  // Map array of players (player keys) to actual entities
  const [gamePlayers, { set: setGamePlayers }] = useStateHandlers([])
  React.useEffect(() => {
    // Take each player key as property of allPlayers
    setGamePlayers(players.map(R.prop(R.__, allPlayers)))
  }, [allPlayers, players])

  // playersReady is boolean based on gamePlayers' isReady props
  const [playersReady, { set: setPlayersReady }] = useStateHandlers(false)
  React.useEffect(() => {
    // Check if every gamePlayer isReady and has connections
    const gamePlayersReady = R.all(
      R.both(R.prop('isReady'), R.prop('connections')),
      gamePlayers
    )
    setPlayersReady(gamePlayersReady)
  }, [gamePlayers, setPlayersReady])

  return playersReady
    ? <p>All players ready!</p>
    : <p>Still waiting for someone...</p>
}

export default GamePlayersStart;