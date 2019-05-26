import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GamePlayers from './players';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/leaves';
import { ROUTES } from '../../constants/routes';
import GameRole from './role';

function Game({ match }) {
  const { params: { gameId } } = match;

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(actions.currentGame.create.update(gameId))
  }, [dispatch, gameId])

  return (
    <Switch>
      <Route path={ROUTES.GamePlayers} component={GamePlayers} />
      <Route path={ROUTES.GameRole} component={GameRole} />
    </Switch>
  )
}

export default Game;