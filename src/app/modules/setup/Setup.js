import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SetupGame from './game';
import SetupName from './name';
import { ROUTES } from '../../constants/routes';
import Lobby from '../lobby';

function Setup() {
  return (
    <Switch>
      <Route path={ROUTES.SetupGame} component={SetupGame} />
      <Route path={ROUTES.SetupName} component={SetupName} />
      <Route path={ROUTES.Lobby} component={Lobby} />
      <Route path="/" component={Lobby} />
    </Switch>
  )
}

export default Setup;