export const intialState = {
  uid: null,
  game: {
    key: null,
    host: null,
    name: '',
    players: {},
    hasConspiracy: null,
    isInSignups: null,
    isStarted: null,
    isDay: null,
    isComplete: null,
    victim: null
  },
  player: {
    key: null,
    name: null,
    connections: {},
    currentGame: null,
    gamesCompleted: [],
    isHost: null,
    isInnocent: null,
    isReady: null,
    isVoting: null,
    vote: null
  }
}