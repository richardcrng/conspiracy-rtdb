import React from 'react';
// import { Switch, Route } from 'react-router-dom';
// import GameRole from '../role';
import GamePlayers from '../players';
// import { ROUTES } from '../../../constants/routes';

function GamePrestart() {
  return (
    <GamePlayers />
    // <Switch>
    //   <Route path={ROUTES.GamePlayers} component={GamePlayers} />
    //   <Route path="/" component={GameRole} />
    // </Switch>
  )
}

export default GamePrestart;