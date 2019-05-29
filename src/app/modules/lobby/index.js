import _ from 'lodash';
import React from 'react';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import LobbyItem from './item';
import { ROUTES } from '../../constants/routes';
import LinkButton from '../../../lib/molecules/LinkButton';

function Lobby() {
  const games = useFirebaseDatabaseValue('games')

  return (
    <>
      <h1>Games available</h1>
      {_.map(games, game => (
        <LobbyItem
          key={game.key}
          id={game.key}
          name={game.name}
          players={game.players}
        />
      ))}
      <div className="CenterBottom">
        <LinkButton
          primary
          size="huge"
          text="Create"
          to={ROUTES.SetupGame}
        />
      </div>
    </>
  )
}

export default Lobby;