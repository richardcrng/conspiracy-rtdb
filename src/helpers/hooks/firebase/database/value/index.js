import React from 'react';
import useFirebaseDatabaseRef from '../ref';

function useFirebaseDatabaseValue(path) {
  const ref = useFirebaseDatabaseRef(path)
  const [value, setValue]

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
    ref.on('value', updateValueFromSnapshot)

    return function cleanup() {
      ref.off('value', updateValueFromSnapshot)
    }
  }, [updateValueFromSnapshot])

  return value
}

export default useFirebaseDatabaseValue;