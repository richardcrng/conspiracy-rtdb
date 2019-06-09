import * as R from 'ramda'
import _ from 'lodash';
import { all, select, call, getContext, takeLatest, takeLeading, takeEvery } from "redux-saga/effects";
import selectors from "../selectors";
import { makeActionCreator } from "redux-leaves";
import { shouldBeConspiracy } from "../../helpers/conspiracy";
import { generatePushID } from 'provide-firebase-middleware';
import { references } from '../../firebase';
import { VOTES } from '../../app/constants/votes';
import { RESET_ENTITY } from '../../app/constants/entities';
import { ROUTES } from '../../app/constants/routes';

export function* assignRoles() {
  const playerKeys = yield select(selectors.getGamePlayersKeys)
  const gameKey = yield select(selectors.getGameKey)
  const effect = shouldBeConspiracy(playerKeys.length)
    ? call(rolesConspiracy, playerKeys, gameKey)
    : call(rolesNoConspiracy, playerKeys, gameKey)
  yield effect
}

export function* createGame({ payload: { host, name, history } }) {
  const key = generatePushID()  // key for game

  const gameConfig = {
    key,
    host,
    name,
    isInSignups: true,
    isComplete: false     // so we can filter by this
  }

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

export function* closeAlert() {
  const key = yield select(selectors.getUserKey)
  yield call(updatePlayer, { key, alert: { isOpen: false  } })
}

export function* createOrSyncUserName({ payload: name }) {
  const key = yield select(selectors.getUserKey)
  const firebase = yield getFirebase()
  const firebaseUser = firebase.auth().currentUser
  const authName = R.prop('displayName', firebaseUser)
  const dbName = yield select(selectors.getUserName)

  if (name) {
    yield all([
      firebaseUser.updateProfile({ displayName: name }),
      call(updatePlayer, { key, name: name })
    ])
  } else if (dbName) {
    yield firebaseUser.updateProfile({ displayName: dbName })
  }
  else if (authName) {
    yield call(updatePlayer, { key, name: authName })
  }

}

export function* disbandGame() {
  const gameKey = yield select(selectors.getGameId)
  const playerKeys = yield select(selectors.getGamePlayersKeys)
  yield all([
    call(deleteGame, { key: gameKey }),
    call(assignToAll, {
      ...RESET_ENTITY.player,
      alert: {
        header: "Game disbanded",
        message: "The host disbanded the game - sorry!",
        buttons: ["Sad!"]
      }
    }, playerKeys)
  ])
}

export function* endGame() {
  const gameKey = yield select(selectors.getGameKey)
  const playerKeys = yield select(selectors.getGamePlayersKeys)
  yield call(updateGame, { key: gameKey, isDay: false })
  yield call(produceGameResult)
  yield call(assignToAll, {
    alert: {
      header: "Game complete!",
      message: "All players have voted!",
      isOpen: true,
      buttons: ["Okay"],
    }
  }, playerKeys)
  yield call(updateGame, { key: gameKey, isComplete: true })
}

export function* getFirebase() {
  return yield getContext('firebase')
}

export function* joinGame(arg) {
  const { playerKey, gameKey } = yield call(argToPlayerAndGameKey, arg)
  yield all([
    call(updatePlayer, { key: playerKey, currentGame: gameKey }),
    call(addPlayerToGame, { playerKey, gameKey })
  ])
}

export function* leaveGame(arg) {
  const { playerKey, gameKey } = yield call(argToPlayerAndGameKey, arg)
  yield all([
    call(removePlayerFromGamePlayers, { playerKey, gameKey }),
    call(updatePlayer, {  key: playerKey, ...RESET_ENTITY.player })
  ])
}

export function* startGame() {
  // User is host, so game to start is their current game
  const gameKey = yield select(selectors.getUserCurrentGame)
  yield all([
    call(assignRoles),
    call(updateGame, { key: gameKey, isStarted: true, isDay: true })
  ])
}

export function* updateGame(arg) {
  const firebase = yield getFirebase()
  const [key, props] = yield call(argToKeyAndRest, arg)
  if (!key) return
  yield references.getGameByKey(key, firebase).update({ key, ...props })
}

export function* updatePlayer(arg) {
  const firebase = yield getFirebase()
  const [key, props] = yield call(argToKeyAndRest, arg)
  if (!key) return
  yield references.getPlayerByKey(key, firebase).update({ key, ...props })
}

export function* updateGamePlayer({ gameKey, playerKey, ...props }) {
  const firebase = yield getFirebase()
  yield references.getPlayersByGameKey(gameKey, firebase).child(playerKey).update(props)
}

function* addPlayerToGame(arg) {
  const firebase = yield getFirebase()
  const { playerKey, gameKey } = yield call(argToPlayerAndGameKey, arg)

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
  let playerKey, gameKey, rest
  if (arg.type) {
    ({ payload: { playerKey, gameKey, ...rest } } = arg)
  } else {
    ({ playerKey, gameKey, ...rest } = arg)
  }
  return { playerKey, gameKey, ...rest }
}

function* assignToAll(props = {}, playerKeys = []) {
  yield all(playerKeys.map(id => (
    call(updatePlayer, { key: id, ...props })
  )))
}

function* deleteGame(arg) {
  const firebase = yield getFirebase()
  const [key] = yield call(argToKeyAndRest, arg)
  yield firebase.database().ref(`games/${key}`).remove()
}

function* produceGameResult() {
  const hasConspiracy = yield select(selectors.getGameHasConspiracy)
  yield hasConspiracy
    ? call(produceGameResultFromConspiracy)
    : call(produceGameResultFromNoConspiracy)
}

function* produceGameResultFromConspiracy() {
  const gameKey = yield select(selectors.getGameKey)
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
  const gameKey = yield select(selectors.getGameKey)
  const playersArr = yield select(selectors.getGamePlayersArray)
  yield all(playersArr.map(({ key: playerKey, vote }) => (
    vote === VOTES.noConspiracy
      ? call(updateGamePlayer, ({ gameKey, playerKey, vote, winner: true }))
      : call(updateGamePlayer, ({ gameKey, playerKey, vote, winner: false }))
  )))
}

function* removePlayerFromGamePlayers(arg) {
  const firebase = yield getFirebase()
  const { playerKey, gameKey } = yield call(argToPlayerAndGameKey, arg)
  yield references.getPlayersByGameKey(gameKey, firebase).child(playerKey).remove()
}

function* rolesConspiracy(playerKeys, gameKey) {
  const [victim, ...conspirators] = _.shuffle(playerKeys)
  yield all([
    call(setVictimOfGame, victim, gameKey),
    call(assignToAll, { isInnocent: false, isVoting: false, vote: null }, conspirators)
  ])
}

function* rolesNoConspiracy(playerKeys, gameKey) {
  console.log("no conspiracy")
  yield all([
    call(updateGame, { key: gameKey, hasConspiracy: false }),
    call(assignToAll, { isInnocent: true, isVoting: false, vote: null }, playerKeys)
  ])
}

function* setVictimOfGame(playerKey, gameKey) {
  yield all([
    call(updatePlayer, { key: playerKey, isInnocent: true, isVoting: false, vote: null }),
    call(updateGame, { key: gameKey, hasConspiracy: true, victim: playerKey })
  ])
}

assignRoles.TRIGGER = "TRIGGER_SAGA: assignRoles"
assignRoles.trigger = makeActionCreator(assignRoles.TRIGGER)

closeAlert.TRIGGER = "TRIGGER_SAGA: closeAlert"
closeAlert.trigger = makeActionCreator(closeAlert.TRIGGER)

createGame.TRIGGER = "TRIGGER_SAGA: createGame"
createGame.trigger = makeActionCreator(createGame.TRIGGER)

createOrSyncUserName.TRIGGER = "TRIGGER_SAGA: createOrSyncUserName"
createOrSyncUserName.trigger = makeActionCreator(createOrSyncUserName.TRIGGER)

disbandGame.TRIGGER = "TRIGGER_SAGA: disbandGame"
disbandGame.trigger = makeActionCreator(disbandGame.TRIGGER)

endGame.TRIGGER = "TRIGGER_SAGA: endGame"
endGame.trigger = makeActionCreator(endGame.TRIGGER)

joinGame.TRIGGER = "TRIGGER_SAGA: joinGame"
joinGame.trigger = makeActionCreator(joinGame.TRIGGER)

leaveGame.TRIGGER = "TRIGGER_SAGA: leaveGame"
leaveGame.trigger = makeActionCreator(leaveGame.TRIGGER)

startGame.TRIGGER = "TRIGGER_SAGA: startGame"
startGame.trigger = makeActionCreator(startGame.TRIGGER)

updateGame.TRIGGER = "TRIGGER_SAGA: updateGame"
updateGame.trigger = makeActionCreator(updateGame.TRIGGER)

updatePlayer.TRIGGER = "TRIGGER_SAGA: updatePlayer"
updatePlayer.trigger = makeActionCreator(updatePlayer.TRIGGER)

export const sagas = [
  takeLeading(assignRoles.TRIGGER, assignRoles),
  takeEvery(closeAlert.TRIGGER, closeAlert),
  takeLeading(createGame.TRIGGER, createGame),
  takeEvery(createOrSyncUserName.TRIGGER, createOrSyncUserName),
  takeEvery(disbandGame.TRIGGER, disbandGame),
  takeLeading(endGame.TRIGGER, endGame),
  takeLatest(joinGame.TRIGGER, joinGame),
  takeEvery(leaveGame.TRIGGER, leaveGame),
  takeLeading(startGame.TRIGGER, startGame),
  takeEvery(updateGame.TRIGGER, updateGame),
  takeEvery(updatePlayer.TRIGGER, updatePlayer)
]