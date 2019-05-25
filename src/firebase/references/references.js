import * as R from 'ramda'
import { references } from '../../helpers/firebase-references';

// Takes two args, key and firebase
export const getGameById = references.getEntityTypeById('games')

// Takes two args, key and firebase
export const getPlayersByGameId = R.compose(
  references.getChildOfRef('players'),
  getGameById
)

// Takes two args, key and firebase
export const getHostByGameId = R.compose(
  references.getChildOfRef('host'),
  getGameById
)

// Takes two args, key and firebase
export const getPlayerById = references.getEntityTypeById('players')

// Takes two args, key and firebase
export const getCurrentGameByPlayerId = R.compose(
  references.getChildOfRef('currentGame'),
  getPlayerById
)