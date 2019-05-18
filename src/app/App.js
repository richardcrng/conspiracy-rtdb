import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './modules/signin';
import EnterName from './modules/enterName';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
