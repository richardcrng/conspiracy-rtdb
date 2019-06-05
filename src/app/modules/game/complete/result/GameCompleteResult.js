import React from 'react';
import GameCompleteResultTable from './table';
import GameCompleteResultDeclare from './declare';
import ButtonCentreBottom from '../../../../lib/molecules/ButtonCentreBottom';
import { useDispatch, useSelector } from 'react-redux';
import selectors from '../../../../../redux/selectors';
import { updatePlayer } from '../../../../../redux/saga/sagas';
import { RESET_ENTITY } from '../../../../constants/entities';

function GameCompleteResult() {
  const dispatch = useDispatch()
  const key = useSelector(selectors.getUserKey)

  return (
    <>
      <GameCompleteResultDeclare />
      <GameCompleteResultTable />
      <ButtonCentreBottom
        onClick={() => {
          dispatch(updatePlayer.trigger({ key, ...RESET_ENTITY.player }))
        }}
        text="Back to lobby"
      />
    </>
  )
}

export default GameCompleteResult;