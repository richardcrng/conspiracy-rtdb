import * as R from 'ramda';
import React from 'react';
import GamePlayersItem from './item';
import { useFirebaseDatabaseValue, useFirebaseUserUid } from 'provide-firebase-middleware';
import GamePlayersReadyToggle from './readyToggle';

function GamePlayers({ match }) {
  const { params: { gameId } } = match;
  const uid = useFirebaseUserUid()
  const game = useFirebaseDatabaseValue(`/games/${gameId}`)
  const isHost = uid === R.prop('host', game)

  return (
    <>
      <h1>Players for game {gameId}</h1>
      {isHost && <b>You are host!</b>}
      {game && game.players && R.map(
        ({ key }) => <GamePlayersItem key={key} id={key} />,
        Object.values(game.players)
      )}
      <GamePlayersReadyToggle />
    </>
  )
}

export default GamePlayers;