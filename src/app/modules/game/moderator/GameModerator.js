import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import selectors from '../../../../redux/selectors';
import { endGame } from '../../../../redux/saga/sagas';

function GameModerator() {
  const dispatch = useDispatch()
  const isDay = useSelector(selectors.getIsDayInGame)
  const allVoting = useSelector(selectors.getGamePlayersAllVoting)

  React.useEffect(() => {
    if (isDay && allVoting) {
      dispatch(endGame.trigger())
    }
  }, [dispatch, isDay, allVoting])

  return null
}

export default GameModerator;