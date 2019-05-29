import * as R from 'ramda'
import { createSelector } from "reselect";

export const getGame = state => state.game
const getGameProp = prop => createSelector(
  getGame,
  R.prop(prop)
)

export const getGameKey = getGameProp('key')
export const getGameId = getGameKey

export const getGameHost = getGameProp('host')
export const getGamePlayers = getGameProp('players')
export const getGameHasConspiracy = getGameProp('hasConspiracy')
export const getGameVictimId = getGameProp('victim')
export const getGameIsStarted = getGameProp('isStarted')
export const getGameIsComplete = getGameProp('isComplete')
export const getIsDayInGame = getGameProp('isDay')

export const getGamePlayersArray = createSelector(
  getGamePlayers,
  R.compose(
    R.sortBy(R.prop('priority')),
    Object.values
  )
  // players => R.sortBy(R.prop('priority'), Object.values(players))
)

export const getGamePlayersKeys = createSelector(
  getGamePlayers,
  Object.keys
)
export const getGamePlayersIds = getGamePlayersKeys


export const getGameVictim = createSelector(
  getGamePlayers,
  getGameVictimId,
  (players, id) => players[id]
)

const getGameVictimProp = prop => createSelector(
  getGameVictim,
  R.prop(prop)
)

export const getGameVictimName = getGameVictimProp('name')

export const getGameVictimVote = getGameVictimProp('vote')

export const getGamePlayersAllVoting = createSelector(
  getGamePlayersArray,
  R.both(
    R.compose(R.gt(R.__, 1), R.length), // players.length >= 1
    R.all(R.prop('isVoting'))           // all have truthy 'isVoting' prop
  )
  // players => (
  //   players.length >= 1
  //   && R.all(R.prop('isVoting'))(players)
  // )
)