import * as R from 'ramda'
import { createSelector } from "reselect";

export const getGame = state => state.game
const getGameProp = prop => createSelector(
  getGame,
  R.prop(prop)
)

export const getGameKey = getGameProp('key')
export const getGameId = getGameKey
export const getGameName = getGameProp('name')
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

export const getGamePlayersAllReady = createSelector(
  getGamePlayersArray,
  R.all(R.both(R.prop('isReady'), R.prop('connections')))
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
  R.all(R.prop('isVoting'))
)

export const getIsAtLeastOneGamePlayer = createSelector(
  getGamePlayersArray,
  R.compose(R.gte(R.__, 1), R.length)
)

export const getGamePlayersAllNonTriviallyVoting = createSelector(
  getGamePlayersAllVoting,
  getGamePlayersArray,
  R.and
)
