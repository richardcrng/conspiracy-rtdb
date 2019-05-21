import React from 'react';
import useFirebaseDatabaseRef from '../ref';

function useFirebaseDatabaseSet(path) {
  const reference = useFirebaseDatabaseRef(path)
  const [set, updateSet] = React.useState(() => reference.set)

  return set
}

export default useFirebaseDatabaseSet;