import React from 'react';
import useFirebaseCurrentUser from '../../../helpers/hooks/firebase/currentUser';
import { useFirebase } from 'use-firebase-context';

function EnterName(props) {
  const firebase = useFirebase()
  const user = useFirebaseCurrentUser()

  console.log(firebase)
  console.log(user)

  return (
    <div>Enter your name</div>
  )
}

export default EnterName;