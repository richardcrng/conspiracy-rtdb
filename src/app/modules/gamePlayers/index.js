import React from 'react';
import GamePlayersItem from './item';

function GamePlayers({ match }) {
  const { params: { gameId } } = match;

  return (
    <>
      <h1>Players for game {gameId}</h1>
      {players.map(player => (
        <GamePlayersItem key={player} name={player} ready />
      ))}
    </>
  )
}

const players = [
  "Player 1",
  "Player 2"
]

export default GamePlayers;