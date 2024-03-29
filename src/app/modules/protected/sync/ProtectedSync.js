import * as R from 'ramda';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFirebaseDatabaseValue, useFirebaseUser, useFirebase, generatePushID } from 'provide-firebase-middleware';
import { references } from '../../../../firebase';
import { actions } from '../../../../redux/leaves';
import useGamePlayers from '../../../../helpers/hooks/gamePlayers';
import generateName from '../../../../helpers/utils/generateName';
import { createOrSyncUserName } from '../../../../redux/saga/sagas';

function ProtectedSync() {
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const user = useFirebaseUser()
  const uid = R.prop('uid', user)

  // Keep user in sync with Firebase
  const player = useFirebaseDatabaseValue(`players/${uid}`)
  useEffect(() => {
    if (uid && player && player.name) {
      // User exists as player in database
      const updatePlayer = dataSnapshot => {
        dispatch(actions.user.create.update(dataSnapshot.val()))
      }
      const playerRef = references.getPlayerByKey(uid, firebase)
      playerRef.on('value', updatePlayer)

      return function cleanup() {
        playerRef.off('value', updatePlayer)
      }
    } else if (uid) {
      // User does not exist as player in database - yet
      const playerRef = references.getPlayerByKey(uid, firebase)

      // Update name after timeout to stop premature overwriting when loading
      const timeout = setTimeout(() => {
        playerRef.update({
          name: R.defaultTo(generateName(), user.displayName),
          key: uid
        }).then(() => {
          dispatch(createOrSyncUserName.trigger(
            R.defaultTo(generateName(), user.displayName)
          ))
        })
      }, 1000);

      return function cleanup() {
        clearTimeout(timeout)
      }
    }
  }, [uid, player, dispatch])

  // Keep Redux's current game in sync with player's game on Firebase
  const gameKey = R.prop('currentGame', player)
  const game = useFirebaseDatabaseValue(`games/${gameKey}`) || {}
  const players = useGamePlayers(gameKey)
  useEffect(() => {
    if (gameKey && game) {
      const updateGame = () => {
        dispatch(actions.game.create.update({ ...game, players }))
      }
      const gameRef = references.getGameByKey(gameKey, firebase)
      gameRef.on('value', updateGame)

      return function cleanup() {
        gameRef.off('value', updateGame)
      }
    } else {
      dispatch(actions.game.create.reset())
    }
  }, [gameKey, game, players, dispatch])

  // Keep connections monitored
  useEffect(() => {
    if (uid) {
      const connectionId = generatePushID()
      const playerConnectionsRef = firebase.database().ref(`players/${uid}/connections`)
      playerConnectionsRef.update(({ [connectionId]: true }))
      playerConnectionsRef.child(connectionId).onDisconnect().remove()
    }
  }, [firebase, uid])

  return null
}

export default ProtectedSync;