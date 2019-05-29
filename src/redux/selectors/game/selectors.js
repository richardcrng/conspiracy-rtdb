import * as R from 'ramda'
import { createSelector } from "reselect";

export const getGame = state => state.game

export const getGameId = createSelector(
  getGame,
  game => game.key
)

export const getGameHost = createSelector(
  getGame,
  R.prop('host')
)

export const getGamePlayers = createSelector(
  getGame,
  game => game.players
)

export const getGamePlayersArray = createSelector(
  getGamePlayers,
  players => R.sortBy(R.prop('priority'), Object.values(players))
)

export const getGamePlayersIds = createSelector(
  getGamePlayers,
  players => Object.keys(players)
)

export const getGameHasConspiracy = createSelector(
  getGame,
  game => game.hasConspiracy
)

export const getGameVictimId = createSelector(
  getGame,
  R.prop('victim')
)

export const getGameVictim = createSelector(
  getGamePlayers,
  getGameVictimId,
  (players, id) => players[id]
)

export const getGameVictimName = createSelector(
  getGameVictim,
  R.prop('name')
)

export const getGameVictimVote = createSelector(
  getGameVictim,
  R.prop('vote')
)

export const getGamePlayersAllVoting = createSelector(
  getGamePlayersArray,
  players => (
    players.length >= 1
    && R.all(R.prop('isVoting'))(players)
  )
)

export const getGameIsStarted = createSelector(
  getGame,
  R.prop('isStarted')
)

export const getGameIsComplete = createSelector(
  getGame,
  R.prop('isComplete')
)

export const getIsDayInGame = createSelector(
  getGame,
  R.prop('isDay')
)