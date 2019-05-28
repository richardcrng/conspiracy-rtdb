import * as R from 'ramda'
import { createSelector } from "reselect";

export const getGame = state => state.game

export const getGameId = createSelector(
  getGame,
  game => game.id
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