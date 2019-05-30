import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebaseui from 'firebaseui'
import { useFirebaseContext, useFirebaseDatabaseValue } from 'provide-firebase-middleware';
import { ROUTES } from '../../constants/routes';
import { useRouter } from '../../providers/router/RouterProvider';

function SignIn() {
  const firebase = useFirebaseContext()
  const players = useFirebaseDatabaseValue('players')
  const { history } = useRouter()

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /enter-name after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.

    // signInSuccessUrl: '/enter-name',

    callbacks: {
      signInSuccessWithAuthResult: ({ user, additionalUserInfo }) => {
        const { uid: key, displayName: name } = user;
        if (!players || !players[key]) {
          console.log("gonna try storing player")
          firebase.database().ref(`players/${key}`).set({ key, name })
        }
        history.push(ROUTES.SetupProfile)
        // Return false to indicate no redirect URL
        return false
      }
    },

    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID


      // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };

  return (
    <div className="text-center" style={{ margin: "50px" }}>
      <h1>CONSPIRACY</h1>
      <p>A Richard Ng development</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.Auth} />
    </div>
  )
}

export default SignIn;