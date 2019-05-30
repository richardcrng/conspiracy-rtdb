import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import Lobby from '../lobby';
import SetupGame from './game';
import SetupName from './name';
import SetupProfile from './profile';

function Setup() {
  return (
    <Switch>
      <Route path={ROUTES.SetupGame} component={SetupGame} />
      <Route path={ROUTES.SetupName} component={SetupName} />
      <Route path={ROUTES.SetupProfile} component={SetupProfile} />
      <Route path={ROUTES.Lobby} component={Lobby} />
      <Route path="/" component={Lobby} />
    </Switch>
  )
}

export default Setup;