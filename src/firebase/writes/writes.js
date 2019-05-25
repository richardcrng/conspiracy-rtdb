import { generatePushID } from 'provide-firebase-middleware';
import references from '../references';

/**
 * 
 * @param {ConspiracyGame} config
 * @param {string} config.name - Name of newly created game
 * @param {string} config.host - Host's player key
 * 
 * @returns {string} Game ID of the created game
 */
export const createGame = ({ name, host }, firebase) => {
  const key = generatePushID()  // key for game

  const gameConfig = { key, host, name, isInSignups: true }

  if (host) {
    gameConfig.players = {
      [host]: {
        key: host,
        priority: generatePushID()
      }
    }
    updatePlayer({ key: host, currentGame: key, isHost: true }, firebase)
  }

  updateGame(gameConfig, firebase)
  return key
}

/**
 * 
 * @param {string} playerKey - Firebase player key
 * @param {string} gameKey - Firebase game key
 */
export const joinGame = (playerKey, gameKey, firebase) => {
  addPlayerToGameList(playerKey, gameKey, firebase)
  updateCurrentGame(playerKey, gameKey, firebase)
}

export const updateGame = ({ key, ...config }, firebase) => (
  references.getGameByKeyByKey(key, firebase).update({ key, ...config })
)

/**
 * 
 * @param {ConspiracyPlayer} playerConfig 
 */
export const updatePlayer = ({ key, ...config }, firebase) => (
  references.getPlayerByKey(key, firebase).update({ key, ...config })
)

const addPlayerToGameList = (playerKey, gameKey, firebase) => (
  references.getPlayersByGameId(gameKey, firebase).update({
    [playerKey]: {
      key: playerKey,
      priority: generatePushID()
    }
  })
)

const updateCurrentGame = (playerKey, gameKey, firebase) => (
  references.getCurrentGameByPlayerId(playerKey, firebase).set(gameKey)
)