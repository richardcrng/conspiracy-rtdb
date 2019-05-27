import * as R from 'ramda';
import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseDatabaseValue, useFirebaseUserUid } from 'provide-firebase-middleware';
import GamePlayersItem from './item';
import GamePlayersReadyToggle from './readyToggle';
import GamePlayersStart from './start';
import selectors from '../../../../redux/selectors';
import useGamePlayers from '../../../../helpers/hooks/gamePlayers';

function GamePlayers() {
  const gameId = useSelector(selectors.getGameId)
  const gamePlayers = useGamePlayers(gameId, true)
  const gameHost = useFirebaseDatabaseValue(`/games/${gameId}/host`)
  const uid = useFirebaseUserUid()
  const isHost = uid === gameHost

  console.log(gamePlayers)

  return (
    <>
      <h1>Players for game {gameId}</h1>
      {isHost && <b>You are host!</b>}
      {gamePlayers && R.map(
        ({ key, name, isReady, connections }) => (
          <GamePlayersItem key={key} {...{ name, isReady, connections }} />
        ),
        gamePlayers
      )}
      <GamePlayersReadyToggle />
      {isHost && <GamePlayersStart {...{ gameId, gamePlayers }} />}
    </>
  )
}

export default GamePlayers;