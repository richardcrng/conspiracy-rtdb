import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { generatePushID, useFirebase, useFirebaseUserUid } from 'provide-firebase-middleware';
import SignIn from './modules/signin';
import AppLayout from './common/layout';
import Lobby from './modules/lobby';
import Game from './modules/game';
import Setup from './modules/setup';
import { ROUTES } from './constants/routes';

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
          <Route path={ROUTES.GameId} component={Game} />
          <Route path={ROUTES.Game} component={Game} />
          <Route path={ROUTES.Setup} component={Setup} />
          <Route path={ROUTES.Lobby} component={Lobby} />
          <Route path={ROUTES.SignIn} component={SignIn} />
          <Route path="/" component={
            function Fallback() {
              return (
                <>
                  <div>Fallback</div>
                  <Link to={ROUTES.SignIn}>Sign in</Link>
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
