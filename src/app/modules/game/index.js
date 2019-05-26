import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GamePlayers from './players';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/leaves';

function Game({ match }) {
  const { params: { gameId } } = match;

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(actions.currentGame.create.update(gameId))
  }, [dispatch, gameId])

  return (
    <Switch>
      <Route path="/game/:gameId/players" component={GamePlayers} />
    </Switch>
  )
}

export default Game;