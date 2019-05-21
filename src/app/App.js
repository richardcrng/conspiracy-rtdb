import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './modules/signin';
import EnterName from './modules/enterName';
import { useFirebase } from 'use-firebase-context';
import AppLayout from './common/layout';

function App() {
  const firebase = useFirebase()

  console.log(firebase)

  return (
    <div className="App">
      <AppLayout>
        <Switch>
          <Route path="/enter-name" component={EnterName} />
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
