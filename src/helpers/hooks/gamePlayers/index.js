import * as R from 'ramda'
import React from 'react';
import { useFirebaseDatabaseValue, useStateHandlers } from 'provide-firebase-middleware';

function useGamePlayers(gameId) {
  const allPlayers = useFirebaseDatabaseValue('players')
  const playersJoined = useFirebaseDatabaseValue(
    `/games/${gameId}/players`,
    { orderByChild: 'priority' }
  )

  const [gamePlayers, { set: setGamePlayers }] = useStateHandlers([])
  React.useEffect(() => {
    const selectedPlayers = R.mapObjIndexed(
      ({ key }) => R.prop(key, allPlayers),
      playersJoined
    )
    setGamePlayers(selectedPlayers)
  }, [allPlayers, playersJoined, setGamePlayers])

  return gamePlayers

  // // Create array of keys of players joined
  // const [playerKeys, { set: setPlayerKeys }] = useStateHandlers([])
  // React.useEffect(() => {
  //   setPlayerKeys(Object.keys(playersJoined))
  // }, [playerKeys, setPlayerKeys])

  // // Map array of players (player keys) to actual entities
  // const [gamePlayers, { set: setGamePlayers }] = useStateHandlers([])
  // React.useEffect(() => {
  //   // Take each player key as property of allPlayers
  //   setGamePlayers(playerKeys.map(R.prop(R.__, allPlayers)))
  // }, [allPlayers, playerKeys, setGamePlayers])

  // // Store game players in global state
  // React.useEffect(() => {
  //   const gamePlayersKeyed = _.keyBy(gamePlayers, 'key')
  //   dispatch(actions.players.create.update(gamePlayersKeyed))
  // }, [dispatch, gamePlayers])

  // // playersReady is boolean based on gamePlayers' isReady props
  // const [playersReady, { set: setPlayersReady }] = useStateHandlers(false)
  // React.useEffect(() => {
  //   // Check if every gamePlayer isReady and has connections
  //   const gamePlayersReady = R.all(
  //     R.both(R.prop('isReady'), R.prop('connections')),
  //     gamePlayers
  //   )
  //   setPlayersReady(gamePlayersReady)
  // }, [gamePlayers, setPlayersReady])
}

export default useGamePlayers;