import * as R from 'ramda'
import { createSelector } from 'reselect';

export const getUser = state => state.user

export const getUserProp = prop => createSelector(getUser, R.prop(prop))

export const getUserKey = getUserProp('key')
export const getUid = getUserKey // TODO deprecate

export const getUserName = getUserProp('name')
export const getIsUserHost = getUserProp('isHost')
export const getIsUserVoting = getUserProp('isVoting')
export const getIsVotingFromUid = getIsUserVoting // TODO deprecate
export const getUserCurrentGame = getUserProp('currentGame')
export const getIsUserInCurrentGame = createSelector(
  getUserCurrentGame,
  Boolean
)
export const getIsUserReady = getUserProp('isReady')
export const getUserVote = getUserProp('vote')
export const getIsUserInnocent = getUserProp('isInnocent')