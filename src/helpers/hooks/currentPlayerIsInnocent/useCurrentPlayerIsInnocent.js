import { useFirebaseUserUid, useFirebaseDatabaseValue } from "provide-firebase-middleware";

function useCurrentPlayerIsInnocent() {
  const uid = useFirebaseUserUid()
  const isInnocent = useFirebaseDatabaseValue(`/players/${uid}/isInnocent`)
  return isInnocent
}

export default useCurrentPlayerIsInnocent;