import * as R from 'ramda'
import { createSelector } from "reselect";

export const getGame = state => state.game
export const getUid = state => state.uid

export const getGameId = createSelector(
  getGame,
  game => game.key
)

export const getGameHost = createSelector(
  getGame,
  R.prop('host')
)

export const getIsSelfUidHost = createSelector(
  getGameHost,
  getUid,
  (host, uid) => host === uid
)

export const getGamePlayers = createSelector(
  getGame,
  game => game.players
)

export const getPlayerFromUid = createSelector(
  getGamePlayers,
  getUid,
  (players, uid) => R.prop(uid, players)
)

export const getIsVotingFromUid = createSelector(
  getPlayerFromUid,
  player => R.prop('isVoting', player)
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

export const getGamePlayersAllVoting = createSelector(
  getGamePlayersArray,
  players => (
    players.length >= 1
    && R.all(R.prop('isVoting'))(players)
  )
)

export const getIsDayInGame = createSelector(
  getGame,
  R.prop('isDay')
)