import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useFirebase, useFirebaseUser } from 'provide-firebase-middleware';
import SignIn from './modules/signin';
import EnterName from './modules/enterName';
import AppLayout from './common/layout';
import Lobby from './modules/lobby';
import GamePlayers from './modules/gamePlayers';
import CreateGame from './modules/createGame';
import { generatePushID } from 'provide-firebase-middleware/dist/utils';

function App() {
  const [connectionId] = React.useState(generatePushID())

  const firebase = useFirebase()
  const user = useFirebaseUser() || {}
  const { uid } = user;

  React.useEffect(() => {
    if (uid) {
      const playerConnectionsRef = firebase.database().ref(`players/${uid}/connections`)
      playerConnectionsRef.update(({ [connectionId]: true }))
      playerConnectionsRef.child(connectionId).onDisconnect().remove()
    }
  }, [uid])

  return (
    <div className="App">
      <AppLayout>
        <Switch>
          <Route path="/create-game" component={CreateGame} />
          <Route path="/enter-name" component={EnterName} />
          <Route path="/game/:gameId/players" component={GamePlayers} />
          <Route path="/lobby" component={Lobby} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/" component={
            function Fallback() {
              return (
                <>
                  <div>Fallback</div>
                  <Link to="/sign-in">Sign in</Link>
                </>
              )
            }
          } />
        </Switch>
      </AppLayout>
    </div>
  );
}

export default App;
