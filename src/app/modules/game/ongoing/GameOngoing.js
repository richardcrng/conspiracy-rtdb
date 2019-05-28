import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import GameRole from '../role';
import GameVoting from './../voting';

function GameOngoing() {
  return (
    <Switch>
      <Route path={ROUTES.GameRole} component={GameRole} />
      <Route path={ROUTES.GameVoting} component={GameVoting} />
      <Route path="/" component={GameRole} />
    </Switch>
  )
}

export default GameOngoing;