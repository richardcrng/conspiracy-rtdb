import _ from 'lodash';

export const getGameById = _.curry(
  (firebase, key) => firebase.database().ref(`games/${key}`)
)

export const getPlayerIdsByGameId = _.curry(
  (firebase, key) => getGameById(firebase, key).child('players')
)

export const getPlayerHostIdByGameId = _.curry(
  (firebase, key) => getGameById(firebase, key).child('host')
)

export const getPlayerById = _.curry(
  (firebase, key) => firebase.database().ref(`players/${key}`)
)

export const getCurrentGameIdForPlayerId = _.curry(
  (firebase, key) => getPlayerById(firebase, key).child('currentGame')
)