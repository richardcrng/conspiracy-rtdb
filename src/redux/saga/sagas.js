import _ from 'lodash';
import { all, select, call, getContext, takeLeading } from "redux-saga/effects";
import selectors from "../selectors";
import { makeActionCreator } from "redux-leaves";
import { shouldBeConspiracy } from "../../helpers/conspiracy";
import { generatePushID } from 'provide-firebase-middleware';
import { references } from '../../firebase';

export function* assignRoles() {
  const players = yield select(selectors.getGamePlayers)
  const gameId = yield select(selectors.getGameId)
  const playerIds = Object.keys(players)
  if (shouldBeConspiracy(playerIds.length)) {
    console.log("CONSPIRACY")
    const [victim, ...conspirators] = _.shuffle(playerIds)
    yield all([
      call(setVictimOfGame, victim, gameId),
      call(assignToAll, { isInnocent: false }, conspirators)
    ])
  } else {
    console.log("no conspiracy")
    yield call(assignToAll, { isInnocent: true }, playerIds)
  }
}

export function* createGame({ payload: { host, name } }) {
  const key = generatePushID()  // key for game
  const firebase = yield getFirebase()

  const gameConfig = { key, host, name, isInSignups: true }

  if (host) {
    gameConfig.players = {
      [host]: {
        key: host,
        priority: generatePushID()
      }
    }
    yield references.getPlayerByKey(host, firebase).update({ currentGame: key, isHost: true })
  }

  yield references.getGameByKey(key, firebase).update(gameConfig)

  return key
}

export function* getFirebase() {
  return yield getContext('firebase')
}

export function* startGame() {
  const firebase = yield getFirebase()
  const gameId = yield select(selectors.getGameId)
  yield all([
    call(assignRoles),
    references.getGameByKey(gameId, firebase).update({ isStarted: true })
  ])
}

function* assignToAll(props = {}, playerIds = []) {
  const firebase = yield getFirebase()
  yield all(playerIds.map(id => (
    references.getPlayerByKey(id, firebase).update(props)
  )))
}

function* setVictimOfGame(playerId, gameId) {
  const firebase = yield getFirebase()
  yield all([
    references.getPlayerByKey(playerId, firebase).update({ isInnocent: true }),
    references.getGameByKey(gameId, firebase).update({
      hasConspiracy: true,
      victim: playerId
    })
  ])
}

assignRoles.TRIGGER = "TRIGGER_SAGA: assignRoles"
assignRoles.trigger = makeActionCreator(assignRoles.TRIGGER)

createGame.TRIGGER = "TRIGGER_SAGA: createGame"
createGame.trigger = makeActionCreator(createGame.TRIGGER)

startGame.TRIGGER = "TRIGGER_SAGA: startGame"
startGame.trigger = makeActionCreator(startGame.TRIGGER)

export const sagas = [
  takeLeading(assignRoles.TRIGGER, assignRoles),
  takeLeading(createGame.TRIGGER, createGame),
  takeLeading(startGame.TRIGGER, startGame)
]