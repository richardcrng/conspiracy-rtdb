import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import GameRole from '../role';
import GameVoting from './../voting';
import { useSelector } from 'react-redux';
import selectors from '../../../../redux/selectors';
import GameModerator from '../moderator';
import GameComplete from '../complete';

function GameOngoing() {
  const isHost = useSelector(selectors.getIsSelfUidHost)

  return (
    <>
      {isHost && <GameModerator />}
      <Switch>
        <Route path={ROUTES.GameRole} component={GameRole} />
        <Route path={ROUTES.GameVoting} component={GameVoting} />
        <Route path={ROUTES.GameComplete} component={GameComplete} />
        <Route path="/" component={GameRole} />
      </Switch>
    </>
  )
}

export default GameOngoing;