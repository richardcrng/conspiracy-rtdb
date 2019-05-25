import * as R from 'ramda';
import React from 'react';
import GamePlayersItem from './item';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import GamePlayersReadyToggle from './readyToggle';

function GamePlayers({ match }) {
  const { params: { gameId } } = match;
  const players = useFirebaseDatabaseValue(`/games/${gameId}/players`)

  return (
    <>
      <h1>Players for game {gameId}</h1>
      {players && R.map(
        ({ key }) => <GamePlayersItem key={key} id={key} />,
        Object.values(players)
      )}
      <GamePlayersReadyToggle />
    </>
  )
}

export default GamePlayers;