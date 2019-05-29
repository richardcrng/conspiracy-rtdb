import * as R from 'ramda'
import { createSelector } from 'reselect';

export const getUser = state => state.user

export const getUserProp = prop => createSelector(getUser, R.prop(prop))

export const getUserKey = getUserProp('key')