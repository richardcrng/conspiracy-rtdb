import _ from 'lodash';
import { all, select, call, getContext, takeLeading, takeEvery } from "redux-saga/effects";
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

  const gameConfig = { key, host, name, isInSignups: true }

  if (host) {
    gameConfig.players = {
      [host]: {
        key: host,
        priority: generatePushID()
      }
    }
    yield call(updatePlayer, { key: host, currentGame: key, isHost: true })
  }

  yield call(updateGame, { key, ...gameConfig })

  return key
}

export function* getFirebase() {
  return yield getContext('firebase')
}

export function* startGame() {
  const gameId = yield select(selectors.getGameId)
  yield all([
    call(assignRoles),
    call(updateGame, { key: gameId, isStarted: true })
  ])
}

export function* updateGame(arg) {
  let firebase = yield getFirebase()
  let key, props
  if (arg.type) { // it's an action
    ({ payload: { key, ...props } } = arg) // destructure without declaration
  } else { // should be a config object
    ({ key, ...props } = arg)
  }
  yield references.getGameByKey(key, firebase).update({ key, ...props })
}

export function* updatePlayer(arg) {
  let firebase = yield getFirebase()
  let key, props
  if (arg.type) { // it's an action
    ({ payload: { key, ...props } } = arg) // destructure without declaration
  } else { // should be a config object
    ({ key, ...props } = arg)
  }
  yield references.getPlayerByKey(key, firebase).update({ key, ...props })
}

function* assignToAll(props = {}, playerIds = []) {
  yield all(playerIds.map(id => (
    call(updatePlayer, { key: id, ...props })
  )))
}

function* setVictimOfGame(playerId, gameId) {
  yield all([
    call(updatePlayer, { key: playerId, isInnocent: true }),
    call(updateGame, { key: gameId, hasConspiracy: true, victim: playerId })
  ])
}

assignRoles.TRIGGER = "TRIGGER_SAGA: assignRoles"
assignRoles.trigger = makeActionCreator(assignRoles.TRIGGER)

createGame.TRIGGER = "TRIGGER_SAGA: createGame"
createGame.trigger = makeActionCreator(createGame.TRIGGER)

startGame.TRIGGER = "TRIGGER_SAGA: startGame"
startGame.trigger = makeActionCreator(startGame.TRIGGER)

updatePlayer.TRIGGER = "TRIGGER_SAGA: updatePlayer"
updatePlayer.trigger = makeActionCreator(updatePlayer.TRIGGER)

export const sagas = [
  takeEvery(updatePlayer.TRIGGER, updatePlayer),
  takeLeading(assignRoles.TRIGGER, assignRoles),
  takeLeading(createGame.TRIGGER, createGame),
  takeLeading(startGame.TRIGGER, startGame)
]