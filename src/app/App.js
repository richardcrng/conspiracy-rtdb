import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useFirebase } from '../helpers/provide-firebase-middleware';
import SignIn from './modules/signin';
import EnterName from './modules/enterName';
import AppLayout from './common/layout';
import Lobby from './modules/lobby';
import GamePlayers from './modules/gamePlayers';
import CreateGame from './modules/createGame';

function App() {
  const firebase = useFirebase()
  return (
    <div className="App">
      <AppLayout>
        <Switch>
          <Route path="/create-game" component={CreateGame} />
          <Route path="/enter-name" component={EnterName} />
          <Route path="/players" component={GamePlayers} />
          <Route path="/lobby" component={Lobby} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/" component={
            function Fallback() {
              return (
                <div>Fallback</div>
              )
            }
          } />
        </Switch>
      </AppLayout>
    </div>
  );
}

export default App;
