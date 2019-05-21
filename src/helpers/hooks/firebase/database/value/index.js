import React from 'react';
import useFirebaseDatabaseRef from '../ref';

function useFirebaseDatabaseValue(path) {
  const ref = useFirebaseDatabaseRef(path)
  const [value, setValue] = React.useState()

  let updateValueFromSnapshot = dataSnapshot => {
    setValue(dataSnapshot.val())
  }

  // eslint-disable-next-line no-func-assign
  updateValueFromSnapshot = React.useCallback(
    updateValueFromSnapshot,
    [setValue]
  )
  // Not sure whether this will update on every render

  React.useEffect(() => {
    if (ref) ref.on('value', updateValueFromSnapshot)

    return function cleanup() {
      if (ref) ref.off('value', updateValueFromSnapshot)
    }
  }, [updateValueFromSnapshot])

  return value
}

export default useFirebaseDatabaseValue;