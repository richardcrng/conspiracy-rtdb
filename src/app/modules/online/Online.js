import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../redux/selectors';
import Game from '../game';
import Setup from '../setup';

function Online() {
  const currentGame = useSelector(selectors.getUserCurrentGame)

  return currentGame
    ? <Game />
    : <Setup />
}

export default Online;