import React from 'react';
import { useFirebaseUser } from 'provide-firebase-middleware';
import SignIn from './modules/signin';
import Protected from './modules/protected';

function App() {
  const user = useFirebaseUser()

  return user
    ? <Protected />
    : <SignIn />
}

export default App;
