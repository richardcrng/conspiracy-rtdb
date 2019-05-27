import _ from 'lodash';
import { all, select, call, getContext, takeLeading } from "redux-saga/effects";
import selectors from "../selectors";
import { makeActionCreator } from "redux-leaves";
import { shouldBeConspiracy } from "../../helpers/conspiracy";

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

export function* getFirebase() {
  return yield getContext('firebase')
}

export function* startGame() {
  const firebase = yield getFirebase()
  const gameId = yield select(selectors.getGameId)
  yield all([
    call(assignRoles),
    firebase.database().ref(`games/${gameId}/isStarted`).set(true)
  ])
}

function* assignToAll(props = {}, playerIds = []) {
  const firebase = yield getFirebase()
  yield all(playerIds.map(id => (
    firebase.database().ref(`players/${id}`).update(props)
  )))
}

function* setVictimOfGame(playerId, gameId) {
  const firebase = yield getFirebase()
  yield all([
    firebase.database().ref(`players/${playerId}/isInnocent`).set(true),
    firebase.database().ref(`games/${gameId}`).update({
      hasConspiracy: true,
      victim: playerId
    })
  ])
}

assignRoles.TRIGGER = "TRIGGER_SAGA: assignRoles"
assignRoles.trigger = makeActionCreator(assignRoles.TRIGGER)

startGame.TRIGGER = "TRIGGER_SAGA: startGame"
startGame.trigger = makeActionCreator(startGame.TRIGGER)

export const sagas = [
  takeLeading(assignRoles.TRIGGER, assignRoles),
  takeLeading(startGame.TRIGGER, startGame)
]