import React from 'react';
import { useFirebase } from "use-firebase-context";

function useFirebaseCurrentUser() {
  const firebase = useFirebase()
  const [user, setUser] = React.useState(firebase.auth().currentUser)

  firebase.auth().onAuthStateChanged(setUser)

  return user
}

export default useFirebaseCurrentUser;