import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { generatePushID, useFirebase, useFirebaseUserUid } from 'provide-firebase-middleware';
import SignIn from './modules/signin';
import EnterName from './modules/enterName';
import AppLayout from './common/layout';
import Lobby from './modules/lobby';
import CreateGame from './modules/createGame';
import Game from './modules/game';

function App() {
  const [connectionId] = React.useState(generatePushID())

  const firebase = useFirebase()
  const uid = useFirebaseUserUid()

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
          <Route path="/game/:gameId" component={Game} />
          <Route path="/create-game" component={CreateGame} />
          <Route path="/enter-name" component={EnterName} />
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
