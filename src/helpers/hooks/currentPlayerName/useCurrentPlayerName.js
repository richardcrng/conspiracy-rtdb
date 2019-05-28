import { useFirebaseUserUid, useFirebaseDatabaseValue } from "provide-firebase-middleware";

function useCurrentPlayerName() {
  const uid = useFirebaseUserUid()
  const name = useFirebaseDatabaseValue(`/players/${uid}/name`)
  return name
}

export default useCurrentPlayerName;