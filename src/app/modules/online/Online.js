import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../redux/selectors';
import Game from '../game';
import Lobby from '../lobby';

function Online() {
  const currentGame = useSelector(selectors.getUserCurrentGame)

  return currentGame
    ? <Game />
    : <Lobby />
}

export default Online;