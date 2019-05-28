import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import GameRole from '../role';

function GameOngoing() {
  return (
    <Switch>
      <Route path={ROUTES.GameRole} component={GameRole} />
      <Route path="/" component={GameRole} />
    </Switch>
  )
}

export default GameOngoing;