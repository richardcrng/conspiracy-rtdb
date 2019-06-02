import * as R from 'ramda'
import React from 'react';
import GamePlayerStartMessage from './message';
import { useSelector, useDispatch } from 'react-redux';
import selectors from '../../../../../redux/selectors';
import ButtonCentreBottom from '../../../../../lib/molecules/ButtonCentreBottom';
import { startGame } from '../../../../../redux/saga/sagas';

function GamePlayersStart() {  
  const dispatch = useDispatch()
  const isHost = useSelector(selectors.getIsUserHost)
  const allReady = useSelector(selectors.getGamePlayersAllReady)

  console.log("isHost", isHost)
  console.log("allReady", allReady)

  return (
    <>
      <GamePlayerStartMessage />
      <ButtonCentreBottom
        disabled={!allReady || !isHost}
        onClick={() => {
          if (allReady) {
            dispatch(startGame.trigger())
          }
        }}
      >
        Start
      </ButtonCentreBottom>
    </>
  )
}

export default GamePlayersStart;