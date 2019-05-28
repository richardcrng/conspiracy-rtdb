import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import useCurrentPlayerName from '../../../../helpers/hooks/currentPlayerName';
import GameRoleReveal from './reveal';
import { ROUTES } from './../../../constants/routes';

function GameRole() {
  const name = useCurrentPlayerName()

  return (
    <div>
      <p style={{ fontSize: "120%", fontWeight: "bold" }}>{name}</p>
      <GameRoleReveal />
      <Link to={ROUTES.GameVoting}>
        <Button>Votes</Button>
      </Link>
    </div>
  )
}

export default GameRole;