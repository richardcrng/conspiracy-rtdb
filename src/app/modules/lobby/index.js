import React from 'react';
import LobbyItem from './item';

function Lobby(props) {
  return (
    <>
      <h1>Games available</h1>
      {games.map(game => (
        <LobbyItem key={game} name={game} />
      ))}
    </>
  )
}

const games = [
  "Game 1",
  "Game 2"
]

export default Lobby;