import _ from 'lodash';
import { all, select, call, getContext, takeLatest, takeLeading, takeEvery } from "redux-saga/effects";
import selectors from "../selectors";
import { makeActionCreator } from "redux-leaves";
import { shouldBeConspiracy } from "../../helpers/conspiracy";
import { generatePushID } from 'provide-firebase-middleware';
import { references } from '../../firebase';
import { VOTES } from '../../app/constants/votes';

export function* assignRoles() {
  const playerIds = yield select(selectors.getGamePlayersIds)
  const gameId = yield select(selectors.getGameId)
  const effect = shouldBeConspiracy(playerIds.length)
    ? call(rolesConspiracy, playerIds, gameId)
    : call(rolesNoConspiracy, playerIds, gameId)
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
    yield call(updatePlayer, { key: host, currentGame: key, isHost: true, vote: null, isVoting: null })
  }

  yield call(updateGame, { key, ...gameConfig })

  // if (history) history.push(`/game/${key}/players`)

  return key
}

export function* endGame() {
  const gameId = yield select(selectors.getGameId)
  const playerIds = yield select(selectors.getGamePlayersIds)
  yield call(updateGame, { key: gameId, isDay: false })
  yield call(produceGameResult)
  yield call(updateGame, { key: gameId, isComplete: true })
  yield call(assignToAll, { vote: null, isVoting: null }, playerIds)
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

export function* updateGamePlayer({ gameKey, playerKey, ...props }) {
  const firebase = yield getFirebase()
  yield references.getPlayersByGameKey(gameKey, firebase).child(playerKey).update(props)
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

function* produceGameResult() {
  const hasConspiracy = yield select(selectors.getGameHasConspiracy)
  yield hasConspiracy
    ? call(produceGameResultFromConspiracy)
    : call(produceGameResultFromNoConspiracy)
}

function* produceGameResultFromConspiracy() {
  const gameKey = yield select(selectors.getGameId)
  const playersArr = yield select(selectors.getGamePlayersArray)
  const victimVote = yield select(selectors.getGameVictimVote)
  let victoryFn
  if (victimVote === VOTES.conspiracy) {
    victoryFn = ({ key: playerKey, vote, isInnocent }) => (
      isInnocent
        ? call(updateGamePlayer, ({ gameKey, playerKey, vote, winner: true }))
        : call(updateGamePlayer, ({ gameKey, playerKey, vote, winner: false }))
    )
  } else {
    victoryFn = ({ key: playerKey, vote, isInnocent }) => (
      isInnocent
        ? call(updateGamePlayer, ({ gameKey, playerKey, vote, winner: false }))
        : call(updateGamePlayer, ({ gameKey, playerKey, vote, winner: true }))
    )
  }
  yield all(playersArr.map(victoryFn))
}

function* produceGameResultFromNoConspiracy() {
  const gameKey = yield select(selectors.getGameId)
  const playersArr = yield select(selectors.getGamePlayersArray)
  yield all(playersArr.map(({ key: playerKey, vote }) => (
    vote === VOTES.noConspiracy
      ? call(updateGamePlayer, ({ gameKey, playerKey, vote, winner: true }))
      : call(updateGamePlayer, ({ gameKey, playerKey, vote, winner: false }))
  )))
}

function* rolesConspiracy(playerIds, gameId) {
  const [victim, ...conspirators] = _.shuffle(playerIds)
  yield all([
    call(setVictimOfGame, victim, gameId),
    call(assignToAll, { isInnocent: false, isVoting: false, vote: null }, conspirators)
  ])
}

function* rolesNoConspiracy(playerIds, gameId) {
  console.log("no conspiracy")
  yield all([
    call(updateGame, { key: gameId, hasConspiracy: false }),
    call(assignToAll, { isInnocent: true, isVoting: false, vote: null }, playerIds)
  ])
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

endGame.TRIGGER = "TRIGGER_SAGA: endGame"
endGame.trigger = makeActionCreator(endGame.TRIGGER)

joinGame.TRIGGER = "TRIGGER_SAGA: joinGame"
joinGame.trigger = makeActionCreator(joinGame.TRIGGER)

startGame.TRIGGER = "TRIGGER_SAGA: startGame"
startGame.trigger = makeActionCreator(startGame.TRIGGER)

updateGame.TRIGGER = "TRIGGER_SAGA: updateGame"
updateGame.trigger = makeActionCreator(updateGame.TRIGGER)

updatePlayer.TRIGGER = "TRIGGER_SAGA: updatePlayer"
updatePlayer.trigger = makeActionCreator(updatePlayer.TRIGGER)

export const sagas = [
  takeLeading(assignRoles.TRIGGER, assignRoles),
  takeLeading(createGame.TRIGGER, createGame),
  takeLeading(endGame.TRIGGER, endGame),
  takeLatest(joinGame.TRIGGER, joinGame),
  takeLeading(startGame.TRIGGER, startGame),
  takeEvery(updateGame.TRIGGER, updateGame),
  takeEvery(updatePlayer.TRIGGER, updatePlayer)
]