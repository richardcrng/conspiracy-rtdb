import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import selectors from '../../../../redux/selectors';
import { endGame } from '../../../../redux/saga/sagas';

function GameModerator() {
  const dispatch = useDispatch()
  const isDay = useSelector(selectors.getIsDayInGame)
  const allVoting = useSelector(selectors.getGamePlayersAllNonTriviallyVoting)

  React.useEffect(() => {
    if (isDay && allVoting) {
      dispatch(endGame.trigger())

      // const timeout = setTimeout(() => {
      //   // End game after time out to allow some people to change responses
      //   dispatch(endGame.trigger())
      // }, 2000);

      // return function cleanup() {
      //   clearTimeout(timeout)
      // }
    }
  }, [dispatch, isDay, allVoting])

  return null
}

export default GameModerator;