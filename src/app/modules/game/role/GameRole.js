import React from 'react';
import GameRoleReveal from './reveal';
import { ROUTES } from './../../../constants/routes';
import { useSelector } from 'react-redux';
import selectors from '../../../../redux/selectors';
import ButtonCentreBottom from '../../../lib/molecules/ButtonCentreBottom';
import classes from './GameRole.module.css'

function GameRole() {
  const name = useSelector(selectors.getUserName)

  const [revealed, setRevealed] = React.useState(false)

  return (
    <div className={classes.GameRole}>
      <h1>{name}</h1>
      <GameRoleReveal {...{ revealed, setRevealed }} />
      <ButtonCentreBottom
        disabled={!revealed}
        to={ROUTES.GameVoting}
        text="To Voting"
      />
    </div>
  )
}

export default GameRole;