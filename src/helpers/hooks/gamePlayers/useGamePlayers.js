import * as R from 'ramda'
import React from 'react';
import { useFirebaseDatabaseValue, useStateHandlers } from 'provide-firebase-middleware';

function useGamePlayers(gameId, asPrioritisedArray = false) {
  const fromPlayers = useFirebaseDatabaseValue('players', {
    orderByChild: "currentGame",
    equalTo: gameId
  })

  const fromGame = useFirebaseDatabaseValue(`/games/${gameId}/players`,)

  const [gamePlayers, { set: setGamePlayers }] = useStateHandlers({})
  React.useEffect(() => {
    const players = R.mergeDeepLeft(fromGame, fromPlayers)
    setGamePlayers(players)
  }, [fromPlayers, fromGame, setGamePlayers])

  return asPrioritisedArray
    ? R.sortBy(R.prop('priority'), Object.values(gamePlayers))
    : gamePlayers
}

export default useGamePlayers;