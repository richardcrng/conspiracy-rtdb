import * as R from 'ramda';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFirebaseDatabaseValue, useFirebaseUser, useFirebase, generatePushID } from 'provide-firebase-middleware';
import { references } from '../../../../firebase';
import { actions } from '../../../../redux/leaves';
import useGamePlayers from '../../../../helpers/hooks/gamePlayers';
import generateName from '../../../../helpers/utils/generateName';

function ProtectedSync() {
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const user = useFirebaseUser()
  const uid = R.prop('uid', user)

  // Keep user in sync with Firebase
  const player = useFirebaseDatabaseValue(`players/${uid}`)
  useEffect(() => {
    if (uid && player) {
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
          name: generateName(),
          key: uid
        })
      }, 1000);

      return function cleanup() {
        clearTimeout(timeout)
      }
    }
  }, [uid, player, dispatch])

  // Keep Redux's current game in sync with player's game on Firebase
  const gameKey = R.prop('currentGame', player)
  const {
    players: simplePlayers, // We don't want this: not all information
    ...game                 // We want everything else
  } = useFirebaseDatabaseValue(`games/${gameKey}`) || {}
  const players = useGamePlayers(gameKey) // Use this in place of simplePlayers
  useEffect(() => {
    if (gameKey && game) {
      const updateGame = () => {
        dispatch(actions.game.create.update({ ...game, players }))
      }
      const gameRef = references.getGameByKey(uid, firebase)
      gameRef.on('value', updateGame)

      return function cleanup() {
        gameRef.off('value', updateGame)
      }
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