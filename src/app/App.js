import React from 'react';
import { useFirebaseUser } from 'provide-firebase-middleware';
import SignIn from './modules/signin';
import Protected from './modules/protected';

function App() {
  const user = useFirebaseUser()

  return user
    ? <Protected />
    : <SignIn />

  

  // if (!uid) {
  //   return (
  //     <AppLayout><SignIn /></AppLayout>
  //   )
  // }

  // return (
  //   <div className="App">
  //     <AppLayout>
  //       <Switch>
  //         <Route path={ROUTES.GameId} component={Game} />
  //         <Route path={ROUTES.Setup} component={Setup} />
  //         <Route path={ROUTES.Lobby} component={Lobby} />
  //         <Route path={ROUTES.SignIn} component={SignIn} />
  //         <Route path={ROUTES.Game} component={Game} />
  //         <Route path="/" component={Lobby} />
  //       </Switch>
  //     </AppLayout>
  //   </div>
  // );
}

export default App;
