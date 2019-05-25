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
    // Check if every gamePlayer isReady
    const gamePlayersReady = R.all(R.prop('isReady'), gamePlayers)
    setPlayersReady(gamePlayersReady)
  }, [gamePlayers, setPlayersReady])

  return playersReady
    ? <p>All players ready!</p>
    : <p>Still waiting for someone...</p>
}

export default GamePlayersStart;