import React from 'react';
import { useFirebaseContext } from 'use-firebase-context';

function useFirebaseCurrentUser() {
  const firebase = useFirebaseContext()
  console.log(firebase)
  const [user, setUser] = React.useState(firebase.auth().currentUser)

  firebase.auth().onAuthStateChanged(setUser)

  return user
}

export default useFirebaseCurrentUser;