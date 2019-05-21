import React from 'react';
import useFirebaseDatabaseRef from '../ref';

function useFirebaseDatabaseUpdate(path) {
  const reference = useFirebaseDatabaseRef(path)
  const [update, setUpdate] = React.useState(() => reference.update)
  
  console.log(update)

  return (...args) => {
    console.log("Got args", args, "now passing through")
    update(...args)
  }
}

export default useFirebaseDatabaseUpdate;