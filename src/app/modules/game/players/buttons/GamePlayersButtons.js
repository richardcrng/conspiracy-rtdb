import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectors from '../../../../../redux/selectors';
import { startGame } from '../../../../../redux/saga/sagas';
import CentreBottom from '../../../../lib/atoms/CentreBottom';
import Button from '../../../../lib/atoms/Button';
import PopConfirmKick from '../../../../lib/molecules/PopConfirmKick';

function GamePlayersButtons() {
  const dispatch = useDispatch()
  const isHost = useSelector(selectors.getIsUserHost)
  const allReady = useSelector(selectors.getGamePlayersAllReady)

  return (
    <CentreBottom>
      <PopConfirmKick placement="topLeft">
        <Button
          color="secondary"
          size="huge"
          text="Leave"
        />
      </PopConfirmKick>
      <Button
        color="primary"
        disabled={!allReady || !isHost}
        onClick={() => {
          if (allReady) {
            dispatch(startGame.trigger())
          }
        }}
        size="huge"
        text="Start"
      />
    </CentreBottom>
  )
}

export default GamePlayersButtons;