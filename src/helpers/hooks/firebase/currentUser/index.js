import React from 'react';
import { useFirebase } from "use-firebase-context";

function useFirebaseCurrentUser() {
  const [user, setUser] = React.useState()
  const firebase = useFirebase()

  firebase.auth().onAuthStateChanged(setUser)

  return user
}

export default useFirebaseCurrentUser;