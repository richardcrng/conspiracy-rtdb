import * as R from 'ramda'
import references from '../references';

export const setEntityTypeByKey = R.curry((entityType, key, newValue, firebase) => (
  references.getEntityTypeByKey(entityType, key, firebase)
    .set(newValue)
))

export const updateEntityTypeByKey = R.curry((entityType, key, newProps, firebase) => (
  references.getEntityTypeByKey(entityType, key, firebase)
    .update({ key, ...newProps })
))