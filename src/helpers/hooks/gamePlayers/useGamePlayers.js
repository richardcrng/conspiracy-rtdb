import * as R from 'ramda'
import React from 'react';
import { useFirebaseDatabaseValue, useStateHandlers } from 'provide-firebase-middleware';

function useGamePlayers(gameId, asPrioritisedArray = false) {
  const allPlayers = useFirebaseDatabaseValue('players')
  const playersJoined = useFirebaseDatabaseValue(
    `/games/${gameId}/players`,
    { orderByChild: 'priority' }
  )

  const [gamePlayers, { set: setGamePlayers }] = useStateHandlers([])
  React.useEffect(() => {
    const selectedPlayers = R.mapObjIndexed(
      // merge to keep hold of priority property
      ({ key }) => R.mergeLeft(R.prop(key, playersJoined))(R.prop(key, allPlayers)),
      playersJoined
    )
    setGamePlayers(selectedPlayers)
  }, [allPlayers, playersJoined, setGamePlayers])

  return asPrioritisedArray
    ? R.sortBy(R.prop('priority'), Object.values(gamePlayers))
    : gamePlayers
}

export default useGamePlayers;