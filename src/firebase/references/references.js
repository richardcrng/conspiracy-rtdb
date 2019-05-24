import * as R from 'ramda'
// import { references } from '../../helpers/firebase-references';

export const getGameById = (firebase, key) => firebase.database().ref(`games/${key}`)
// export const getGameById = references.getEntityTypeById(R.__, 'games')

export const getPlayersByGameId = (firebase, key) => getGameById(firebase, key).child('players')
// export const getPlayersByGameId = R.compose(
//   R.applyTo('players'),
//   R.prop('child'),
//   getGameById
// )

// export const getHostByGameId = (firebase, key) => getGameById(firebase, key).child('host')
export const getHostByGameId = R.compose(
  R.applyTo('host'),
  R.prop('child'),
  getGameById
)

export const getPlayerById = (firebase, key) => firebase.database().ref(`players/${key}`)

export const getCurrentGameByPlayerId = (firebase, key) => getPlayerById(firebase, key).child('currentGame')