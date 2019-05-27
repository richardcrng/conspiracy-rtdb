import * as R from 'ramda'

export const getEntityTypeByKey = R.curry((entityType, key, firebase) => (
  firebase.database().ref(`${entityType}/${key}`)
))

export const getChildOfRef = R.curry((child, reference) => reference.child(child))