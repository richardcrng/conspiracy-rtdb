import _ from 'lodash';
import React from 'react';
import LobbyItem from './item';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';

function Lobby(props) {
  const games = useFirebaseDatabaseValue('games')

  return (
    <>
      <h1>Games available</h1>
      {_.map(games, game => (
        <LobbyItem
          key={game.key}
          name={game.name}
          players={game.players}
        />
      ))}
    </>
  )
}

export default Lobby;