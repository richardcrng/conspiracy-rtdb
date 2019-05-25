import * as R from 'ramda';
import React from 'react';
import GamePlayersItem from './item';
import { useFirebaseDatabaseValue, useFirebaseUserUid } from 'provide-firebase-middleware';
import GamePlayersReadyToggle from './readyToggle';
import GamePlayersStart from './start';

function GamePlayers({ match }) {
  const { params: { gameId } } = match;
  const uid = useFirebaseUserUid()
  const game = useFirebaseDatabaseValue(`/games/${gameId}`, { orderByChild: 'priority' })
  const players = R.prop('players', game)
  const isHost = uid === R.prop('host', game)

  return (
    <>
      <h1>Players for game {gameId}</h1>
      {isHost && <b>You are host!</b>}
      {players && R.map(
        ({ key }) => <GamePlayersItem key={key} id={key} />,
        Object.values(players)
      )}
      <GamePlayersReadyToggle />
      {isHost && <GamePlayersStart players={Object.keys(players)} />}
    </>
  )
}

export default GamePlayers;