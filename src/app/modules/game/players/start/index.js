import _ from 'lodash';
import * as R from 'ramda'
import React from 'react';
import { useFirebaseDatabaseValue, useStateHandlers } from 'provide-firebase-middleware';
import GamePlayerStartMessage from './message';
import GamePlayersStartButton from './button';
import { useDispatch } from 'react-redux';
import { actions } from '../../../../../redux/leaves';

function GamePlayersStart({ players = [] }) {
  const dispatch = useDispatch()

  const allPlayers = useFirebaseDatabaseValue('players')

  // Map array of players (player keys) to actual entities
  const [gamePlayers, { set: setGamePlayers }] = useStateHandlers([])
  React.useEffect(() => {
    // Take each player key as property of allPlayers
    setGamePlayers(players.map(R.prop(R.__, allPlayers)))
  }, [allPlayers, players])

  // Store game players in global state
  React.useEffect(() => {
    const gamePlayersKeyed = _.keyBy(gamePlayers, 'key')
    dispatch(actions.players.create.update(gamePlayersKeyed))
  }, [dispatch, gamePlayers])

  // playersReady is boolean based on gamePlayers' isReady props
  const [playersReady, { set: setPlayersReady }] = useStateHandlers(false)
  React.useEffect(() => {
    // Check if every gamePlayer isReady and has connections
    const gamePlayersReady = R.all(
      R.both(R.prop('isReady'), R.prop('connections')),
      gamePlayers
    )
    setPlayersReady(gamePlayersReady)
  }, [gamePlayers, setPlayersReady])

  return (
    <>
      <GamePlayerStartMessage ready={playersReady} />
      <GamePlayersStartButton ready={playersReady} />
    </>
  )
}

export default GamePlayersStart;