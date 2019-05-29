import * as R from 'ramda';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFirebaseDatabaseValue, useFirebaseUser, useFirebase } from 'provide-firebase-middleware';
import { references } from '../../../../firebase';
import { actions } from '../../../../redux/leaves';

function ProtectedSync() {
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const user = useFirebaseUser()
  const uid = R.prop('uid', user)

  // Keep player in sync with Firebase
  const player = useFirebaseDatabaseValue(`players/${uid}`)
  useEffect(() => {
    if (uid && player) {
      const updatePlayer = dataSnapshot => {
        dispatch(actions.player.create.update(dataSnapshot.val()))
      }
      const playerRef = references.getPlayerByKey(uid, firebase)
      playerRef.on('value', updatePlayer)

      return function cleanup() {
        playerRef.off('value', updatePlayer)
      }
    }
  }, [uid, player, dispatch])

  // Keep Redux's current game in sync with player's game on Firebase
  const gameKey = R.prop('currentGame', player)
  const game = useFirebaseDatabaseValue(`games/${gameKey}`)
  useEffect(() => {
    if (gameKey && game) {
      const updateGame = dataSnapshot => {
        dispatch(actions.game.create.update(dataSnapshot.val()))
      }
      const gameRef = references.getGameByKey(uid, firebase)
      gameRef.on('value', updateGame)

      return function cleanup() {
        gameRef.off('value', updateGame)
      }
    }
  }, [gameKey, game, dispatch])

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