import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import GameRoleReveal from './reveal';
import { ROUTES } from './../../../constants/routes';
import { useSelector } from 'react-redux';
import selectors from '../../../../redux/selectors';
import ButtonCentreBottom from '../../../../lib/molecules/ButtonCentreBottom';

function GameRole() {
  const name = useSelector(selectors.getUserName)

  return (
    <div>
      <p style={{ fontSize: "120%", fontWeight: "bold" }}>{name}</p>
      <GameRoleReveal />
      <ButtonCentreBottom
        to={ROUTES.GameVoting}
        text="Voting"
      />
    </div>
  )
}

export default GameRole;