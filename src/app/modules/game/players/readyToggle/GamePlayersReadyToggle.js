import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayer } from '../../../../../redux/saga/sagas';
import selectors from '../../../../../redux/selectors';

function GamePlayersReadyToggle() {
  const dispatch = useDispatch()
  const key = useSelector(selectors.getUserKey)
  const isReady = useSelector(selectors.getIsUserReady)

  return (
    <div
      className="d-flex justify-content-center"
      style={{ position: "fixed", bottom: "110px", left: 0, right: 0 }}
    >
      <Checkbox
        label="Ready"
        onChange={() => dispatch(updatePlayer.trigger({ key, isReady: !isReady }))}
        toggle
        checked={Boolean(isReady)}
      />
    </div>
  )
}

export default GamePlayersReadyToggle;