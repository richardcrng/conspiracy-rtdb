import * as R from 'ramda'
import references from '../references';

export const setEntityTypeByKey = R.curry((entityType, newValue, key, firebase) => (
  references.getEntityTypeByKey(entityType, key, firebase)
    .set(newValue)
))

export const transactEntityTypeByKey = R.curry((entityType, transactionUpdate, key, firebase) => (
  references.getEntityTypeByKey(entityType, key, firebase)
    .transaction(transactionUpdate)
))

export const updateEntityTypeByKey = R.curry((entityType, newProps, key, firebase) => (
  references.getEntityTypeByKey(entityType, key, firebase)
    .update({ key, ...newProps })
))