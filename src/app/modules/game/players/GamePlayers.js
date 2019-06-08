import * as R from 'ramda';
import React from 'react';
import { useSelector } from 'react-redux';
import GamePlayersItem from './item';
import GamePlayersReadyToggle from './readyToggle';
// import GamePlayersStart from './start';
import selectors from '../../../../redux/selectors';
import GamePlayersButtons from './buttons';
import GamePlayerStartMessage from './start/message';

function GamePlayers() {
  const gameName = useSelector(selectors.getGameName)
  const gamePlayers = useSelector(selectors.getGamePlayersArray)
  const isHost = useSelector(selectors.getIsUserHost)

  return (
    <>
      <h1>{gameName}</h1>
      {isHost && <b>You are host!</b>}
      {gamePlayers && R.map(
        ({ key, name, isReady, connections }) => (
          <GamePlayersItem key={key} {...{ name, isReady, connections, id: key }} />
        ),
        gamePlayers
      )}
      <GamePlayersReadyToggle />
      <GamePlayersButtons />
      <GamePlayerStartMessage />
    </>
  )
}

export default GamePlayers;