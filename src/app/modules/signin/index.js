import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebaseui from 'firebaseui'
import { useFirebaseContext } from 'provide-firebase-middleware';

function SignIn(props) {
  const firebase = useFirebaseContext()
  console.log(firebase)

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /enter-name after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.

    // signInSuccessUrl: '/enter-name',

    callbacks: {
      signInSuccessWithAuthResult: authResult => {
        props.history.push("/enter-name")
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
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.Auth} />
    </div>
  )
}

// eslint-disable-next-line no-func-assign
SignIn = withRouter(SignIn)
export default SignIn;