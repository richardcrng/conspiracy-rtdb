import _ from 'lodash';
import React from 'react';
import { useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import LobbyItem from './item';
import { ROUTES } from '../../constants/routes';
import ButtonCentreBottom from '../../../lib/molecules/ButtonCentreBottom';

function Lobby() {
  const games = useFirebaseDatabaseValue('games', {
    orderByChild: "isComplete",
    equalTo: false
  })

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
      {_.size(games) === 0 && <p>No games in lobby... why don't you host one?</p>}
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