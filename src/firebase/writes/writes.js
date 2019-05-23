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
export const createGame = ({ name, host }) => {
  const key = generatePushID()  // key for game

  const gameConfig = { key, name, isInSignups: true }

  if (host) {
    gameConfig.players = {
      [host]: {
        key: host,
        priority: generatePushID()
      }
    }
    updatePlayer({ host, currentGame: key, isHost: true })
  }

  updateGame(gameConfig)
  return key
}

/**
 * 
 * @param {string} playerKey - Firebase player key
 * @param {string} gameKey - Firebase game key
 */
export const joinGame = (playerKey, gameKey) => {
  addPlayerToGameList(playerKey, gameKey)
  updateCurrentGame(playerKey, gameKey)
}

export const updateGame = ({ key, ...config }) => (
  references.getGameById(key).update({ key, ...config })
)

/**
 * 
 * @param {ConspiracyPlayer} playerConfig 
 */
export const updatePlayer = ({ key, ...config }) => {
  references.getPlayerById(key).update({ key, ...config })
}

const addPlayerToGameList = (playerKey, gameKey) => (
  references.getPlayersByGameId(gameKey).update({
    [playerKey]: {
      key: playerKey,
      priority: generatePushID()
    }
  })
)

const updateCurrentGame = (playerKey, gameKey) => (
  references.getCurrentGameByPlayerId(playerKey).set(gameKey)
)