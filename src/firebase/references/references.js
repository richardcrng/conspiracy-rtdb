import * as R from 'ramda'
import { references } from '../../helpers/firebase-references';

// Takes two args, key and firebase
export const getGameByKey = references.getEntityTypeByKey('games')

// Takes two args, key and firebase
export const getPlayersByGameKey = R.compose(
  references.getChildOfRef('players'),
  getGameByKey
)

// Takes two args, key and firebase
export const getHostByGameKey = R.compose(
  references.getChildOfRef('host'),
  getGameByKey
)

// Takes two args, key and firebase
export const getPlayerByKey = references.getEntityTypeByKey('players')

// Takes two args, key and firebase
export const getCurrentGameByPlayerKey = R.compose(
  references.getChildOfRef('currentGame'),
  getPlayerByKey
)