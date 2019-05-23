import { generatePushID } from 'provide-firebase-middleware';
import references from '../references';

/**
 * 
 * @param {ConspiracyGame} config 
 */
export const createGame = ({ key, host, name }) => {
  references.getGameById(key).update({
    key,
    host,
    name,
    isInSignups: true,
    players: {
      [host]: {
        key: host,
        priority: generatePushID()
      }
    }
  })
}

/**
 * 
 * @param {ConspiracyPlayer} playerConfig 
 */
export const updatePlayer = ({ key, ...config }) => {
  references.getPlayerById(key).update(config)
}