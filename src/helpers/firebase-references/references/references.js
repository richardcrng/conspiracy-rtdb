import * as R from 'ramda'

export const getEntityTypeById = R.curry((entityType, id, firebase) => (
  firebase.database().ref(`${entityType}/${id}`)
))

export const getChildOfRef = R.curry((child, reference) => reference.child(child))