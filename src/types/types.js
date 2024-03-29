/**
 * @typedef {Object} ConspiracyPlayer
 * 
 * @property {string} key - Firebase Authentication UID
 * @property {string} name - Player's name
 * @property {Object.<boolean>} connections - Every live connection takes one key
 * @property {string} currentGame - Current game being played by player
 * @property {string[]} gamesCompleted - Array of gameIds completed by the player
 * @property {boolean} isHost - Is the player host of game gameId?
 * @property {boolean} isInnocent - Is the player innocent?
 * @property {boolean} isReady - Is the player 'ready'?
 * @property {boolean} isVoting - Is the player currently voting?
 * @property {('conspiracy'|'noConspiracy')} vote - The player's vote
 * @property {ConspiracyPlayerAlert} alert - Alert to be shown to player
 */

/**
 * @typedef {Object} ConspiracyPlayerAlert
 * 
 * @property {string} header - Alert header
 * @property {string} subheader - Alert subheader
 * @property {string} message - Alert message
 * @property {boolean} isOpen - Is alert open?
 * @property {boolean} backdropDismiss - Should backdrop dismiss?
 * @property {string} dismissPath - Path to navigate to onDidDismiss
 */

/**
 * @typedef {Object} ConspiracyGame
 * 
 * @property {string} key - Game ID
 * @property {string} host - UID of host player
 * @property {string} password - Game password
 * @property {Object.<string, ConspiracyGamePlayer>} players - Object e.g. with { playerOneId: { key: playerOneId, ordered: order }, playerTwoId: true }
 * @property {boolean} hasConspiracy - Does the game have a conspiracy?
 * @property {string} victim - UID of player targeted by conspiracy
 * @property {boolean} isInSignups - Is the game in signups?
 * @property {boolean} isStarted - Has the game started?
 * @property {boolean} isComplete - Has the game been completed?
 */

/**
 * @typedef {Object} ConspiracyGamePlayer
 * 
 * @property {string} key - Player's uid
 * @property {string} priority - Player's priority (https://gist.github.com/mikelehen/3596a30bd69384624c11)
 */