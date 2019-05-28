import _ from 'lodash';
import { all, select, call, getContext, takeLatest, takeLeading, takeEvery } from "redux-saga/effects";
import selectors from "../selectors";
import { makeActionCreator } from "redux-leaves";
import { shouldBeConspiracy } from "../../helpers/conspiracy";
import { generatePushID } from 'provide-firebase-middleware';
import { references } from '../../firebase';

export function* assignRoles() {
  const playerIds = yield select(selectors.getGamePlayersIds)
  const gameId = yield select(selectors.getGameId)
  const effect = shouldBeConspiracy(playerIds.length)
    ? call(rolesConspiracy, playerIds, gameId)
    : call(rolesNoConspiracy, playerIds)
  yield effect
}

export function* createGame({ payload: { host, name, history } }) {
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

  if (history) history.push(`/game/${key}/players`)

  return key
}

export function* getFirebase() {
  return yield getContext('firebase')
}

export function* joinGame(arg) {
  const [playerKey, gameKey] = yield call(argToPlayerAndGameKey, arg)
  yield all([
    call(updatePlayer, { key: playerKey, currentGame: gameKey }),
    call(addPlayerToGame, { playerKey, gameKey })
  ])
}

export function* startGame() {
  const gameId = yield select(selectors.getGameId)
  yield all([
    call(assignRoles),
    call(updateGame, { key: gameId, isStarted: true, isDay: true })
  ])
}

export function* updateGame(arg) {
  let firebase = yield getFirebase()
  const [key, props] = yield call(argToKeyAndRest, arg)
  yield references.getGameByKey(key, firebase).update({ key, ...props })
}

export function* updatePlayer(arg) {
  let firebase = yield getFirebase()
  const [key, props] = yield call(argToKeyAndRest, arg)
  yield references.getPlayerByKey(key, firebase).update({ key, ...props })
  if (props.name) {
    yield firebase.auth().currentUser.updateProfile({ displayName: props.name })
  }
}

function* addPlayerToGame(arg) {
  const firebase = yield getFirebase()
  const [playerKey, gameKey] = yield call(argToPlayerAndGameKey, arg)

  yield references.getPlayersByGameKey(gameKey, firebase).update({
    [playerKey]: { key: playerKey, priority: generatePushID() }
  })
}

function argToKeyAndRest(arg) {
  let key, rest
  if (arg.type) { // it's an action
    ({ payload: { key, ...rest } } = arg) // destructure without declaration
  } else { // should be a config object
    ({ key, ...rest } = arg)
  }
  return [key, rest]
}

function argToPlayerAndGameKey(arg) {
  let playerKey, gameKey
  if (arg.type) {
    ({ payload: { playerKey, gameKey } } = arg)
  } else {
    ({ playerKey, gameKey } = arg)
  }
  return [playerKey, gameKey]
}

function* assignToAll(props = {}, playerIds = []) {
  yield all(playerIds.map(id => (
    call(updatePlayer, { key: id, ...props })
  )))
}

function* rolesConspiracy(playerIds, gameId) {
  const [victim, ...conspirators] = _.shuffle(playerIds)
  yield all([
    call(setVictimOfGame, victim, gameId),
    call(assignToAll, { isInnocent: false, isVoting: false, vote: null }, conspirators)
  ])
}

function* rolesNoConspiracy(playerIds) {
  console.log("no conspiracy")
  yield call(assignToAll, { isInnocent: true, isVoting: false, vote: null }, playerIds)
}

function* setVictimOfGame(playerId, gameId) {
  yield all([
    call(updatePlayer, { key: playerId, isInnocent: true, isVoting: false, vote: null }),
    call(updateGame, { key: gameId, hasConspiracy: true, victim: playerId })
  ])
}

assignRoles.TRIGGER = "TRIGGER_SAGA: assignRoles"
assignRoles.trigger = makeActionCreator(assignRoles.TRIGGER)

createGame.TRIGGER = "TRIGGER_SAGA: createGame"
createGame.trigger = makeActionCreator(createGame.TRIGGER)

joinGame.TRIGGER = "TRIGGER_SAGA: joinGame"
joinGame.trigger = makeActionCreator(joinGame.TRIGGER)

startGame.TRIGGER = "TRIGGER_SAGA: startGame"
startGame.trigger = makeActionCreator(startGame.TRIGGER)

updateGame.TRIGGER = "TRIGGER_SAGA: updateGame"
updateGame.trigger = makeActionCreator(updateGame.TRIGGER)

updatePlayer.TRIGGER = "TRIGGER_SAGA: updatePlayer"
updatePlayer.trigger = makeActionCreator(updatePlayer.TRIGGER)

export const sagas = [
  takeEvery(updateGame.TRIGGER, updateGame),
  takeEvery(updatePlayer.TRIGGER, updatePlayer),
  takeLatest(joinGame.TRIGGER, joinGame),
  takeLeading(assignRoles.TRIGGER, assignRoles),
  takeLeading(createGame.TRIGGER, createGame),
  takeLeading(startGame.TRIGGER, startGame)
]