export const getGameById = (firebase, key) => firebase.database().ref(`games/${key}`)

export const getPlayerIdsByGameId = (firebase, key) => getGameById(firebase, key).child('players')

export const getPlayerHostIdByGameId = (firebase, key) => getGameById(firebase, key).child('host')

export const getPlayerById = (firebase, key) => firebase.database().ref(`players/${key}`)

export const getCurrentGameIdForPlayerId = (firebase, key) => getPlayerById(firebase, key).child('currentGame')