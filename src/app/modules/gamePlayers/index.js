import React from 'react';
import GamePlayersItem from './item';

function GamePlayers(props) {
  return (
    <>
      <h1>Players</h1>
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