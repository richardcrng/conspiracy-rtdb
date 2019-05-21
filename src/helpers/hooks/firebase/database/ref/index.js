import React from 'react';
import { useFirebase } from "use-firebase-context";

function useFirebaseDatabaseRef(path) {
  const firebase = useFirebase()
  const [reference, setReference] = React.useState(
    firebase.database().ref(path)
  )

  return reference
}

export default useFirebaseDatabaseRef;