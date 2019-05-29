import _ from 'lodash';
import React from 'react';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import LobbyItem from './item';
import { ROUTES } from '../../constants/routes';
import LinkButton from '../../../lib/molecules/LinkButton';
import ButtonCentreBottom from '../../../lib/molecules/ButtonCentreBottom';

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
        <ButtonCentreBottom
          primary
          size="huge"
          text="Host new"
          to={ROUTES.SetupGame}
        />
      </div>
    </>
  )
}

export default Lobby;