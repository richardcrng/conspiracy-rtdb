import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SetupGame from './game';
import SetupName from './name';

function Setup() {
  return (
    <Switch>
      <Route path="/setup/game" component={SetupGame} />
      <Route path="/setup/name" component={SetupName} />
    </Switch>
  )
}

export default Setup;