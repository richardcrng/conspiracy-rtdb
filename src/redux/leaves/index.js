import reduxLeaves from 'redux-leaves'

const intialState = {
  games: {

  },
  players: {

  }
}

const [reducer, actions] = reduxLeaves(intialState)

export {
  reducer,
  actions
}

/**
 * @typedef {Object} ConspiracyPlayer
 * 
 * @property {string} key - Firebase Authentication UID
 * @property {string} name - Player's name
 * @property {string} currentGame - Current game being played by player
 * @property {string[]} gamesCompleted - Array of gameIds completed by the player
 * @property {boolean} isHost - Is the player host of game gameId?
 * @property {boolean} isOnline - Is the player online? 
 * @property {boolean} isInnocent - Is the player innocent?
 * @property {boolean} isVoting - Is the player currently voting?
 * @property {('conspiracy'|'noConspiracy')} vote - The player's vote
 */

/**
 * @typedef {Object} ConspiracyGame
 * 
 * @property {string} key - Game ID
 * @property {string} host - UID of host player
 * @property {string} password - Game password
 * @property {string[]} players - Array of ConspiracyPlayer keys/uids
 * @property {boolean} hasConspiracy - Does the game have a conspiracy?
 * @property {string} conspiracyTarget - UID of player targeted by conspiracy
 * @property {boolean} isInSignups - Is the game in signups?
 * @property {boolean} isComplete - Has the game been completed?
 */