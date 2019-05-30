import * as R from 'ramda';
import React from 'react';
import { useSelector } from 'react-redux';
import GamePlayersItem from './item';
import GamePlayersReadyToggle from './readyToggle';
import GamePlayersStart from './start';
import selectors from '../../../../redux/selectors';

function GamePlayers() {
  const gameId = useSelector(selectors.getGameId)
  const gamePlayers = useSelector(selectors.getGamePlayersArray)
  const isHost = useSelector(selectors.getIsUserHost)

  return (
    <>
      <h1>Players for game {gameId}</h1>
      {isHost && <b>You are host!</b>}
      {gamePlayers && R.map(
        ({ key, name, isReady, connections }) => (
          <GamePlayersItem key={key} {...{ name, isReady, connections, id: key }} />
        ),
        gamePlayers
      )}
      <GamePlayersReadyToggle />
      {<GamePlayersStart />}
    </>
  )
}

export default GamePlayers;