import { useFirebase } from "use-firebase-context";

function useFirebaseCurrentUser() {
  const firebase = useFirebase()
  return firebase.auth.currentUser
}

export default useFirebaseCurrentUser;