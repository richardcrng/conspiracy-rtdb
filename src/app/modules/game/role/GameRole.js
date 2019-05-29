import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import GameRoleReveal from './reveal';
import { ROUTES } from './../../../constants/routes';
import { useSelector } from 'react-redux';
import selectors from '../../../../redux/selectors';

function GameRole() {
  const name = useSelector(selectors.getName)

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