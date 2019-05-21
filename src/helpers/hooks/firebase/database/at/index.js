import useFirebaseDatabaseSet from "../set";
import useFirebaseDatabaseValue from "../value";
import useFirebaseDatabaseUpdate from './../update';

function useFirebaseDatabaseAt(path) {
  const value = useFirebaseDatabaseValue(path)
  const set = useFirebaseDatabaseSet(path)
  const update = useFirebaseDatabaseUpdate(path)

  return {
    value,
    set,
    update
  }
}

export default useFirebaseDatabaseAt;