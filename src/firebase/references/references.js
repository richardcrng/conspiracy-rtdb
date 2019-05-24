export const getGameById = (firebase, key) => firebase.database().ref(`games/${key}`)

export const getPlayersByGameId = (firebase, key) => getGameById(firebase, key).child('players')

export const getHostByGameId = (firebase, key) => getGameById(firebase, key).child('host')

export const getPlayerById = (firebase, key) => firebase.database().ref(`players/${key}`)

export const getCurrentGameByPlayerId = (firebase, key) => getPlayerById(firebase, key).child('currentGame')