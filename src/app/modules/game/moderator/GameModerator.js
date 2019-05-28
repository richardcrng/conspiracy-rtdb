import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import selectors from '../../../../redux/selectors';
import { updateGame } from '../../../../redux/saga/sagas';

function GameModerator() {
  const dispatch = useDispatch()
  const key = useSelector(selectors.getGameId)
  const isDay = useSelector(selectors.getIsDayInGame)
  const allVoting = useSelector(selectors.getGamePlayersAllVoting)

  React.useEffect(() => {
    if (isDay && allVoting) {
      dispatch(updateGame.trigger({ key, isDay: false }))
    }
  }, [dispatch, isDay, allVoting])

  return null
}

export default GameModerator;