import * as R from 'ramda';
import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseDatabaseValue, useFirebaseUserUid } from 'provide-firebase-middleware';
import GamePlayersItem from './item';
import GamePlayersReadyToggle from './readyToggle';
import GamePlayersStart from './start';
import selectors from '../../../../redux/selectors';

function GamePlayers() {
  const gameId = useSelector(selectors.getCurrentGame)
  const uid = useFirebaseUserUid()
  const game = useFirebaseDatabaseValue(`/games/${gameId}`, { orderByChild: 'priority' })
  const players = R.prop('players', game)
  const isHost = uid === R.prop('host', game)

  return (
    <>
      <h1>Players for game {gameId}</h1>
      {isHost && <b>You are host!</b>}
      {players && R.map(
        ({ key }) => <GamePlayersItem key={key} id={key} />,
        Object.values(players)
      )}
      <GamePlayersReadyToggle />
      {isHost && <GamePlayersStart players={Object.keys(players)} />}
    </>
  )
}

export default GamePlayers;