import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Popconfirm, Tooltip } from 'antd';
import { FaUserTimes } from 'react-icons/fa';
import selectors from '../../../../../../redux/selectors';
import { leaveGame, disbandGame } from '../../../../../../redux/saga/sagas';

function GamePlayersItemKick({ id: playerKey }) {
  const dispatch = useDispatch()

  const isHost = useSelector(selectors.getIsUserHost)
  const ownKey = useSelector(selectors.getUserKey)
  const gameKey = useSelector(selectors.getUserCurrentGame)

  if (isHost && ownKey !== playerKey) { // trying to kick player
    return (
      <Popconfirm
        placement="topRight"
        title="Do you want to kick this player?"
        onConfirm={() => dispatch(leaveGame.trigger({ playerKey, gameKey }))}
        okText="Yes"
        cancelText="No"
      >
        <FaUserTimes
          size={30}
        />
      </Popconfirm>
    )
  }

  if (isHost) { // trying to kick self as host
    return (
      <Popconfirm
        placement="topRight"
        title="You are host - if you kick yourself, the game will be disbanded. Are you sure you want to do this?"
        onConfirm={() => dispatch(disbandGame.trigger())}
        okText="Yes"
        cancelText="No"
      >
        <FaUserTimes
          size={30}
        />
      </Popconfirm>
    )
  }

  if (ownKey === playerKey) { // trying to leave game as non-host
    return (
      <Popconfirm
        placement="topRight"
        title="Do you want to leave this game?"
        onConfirm={() => dispatch(leaveGame.trigger({ playerKey, gameKey }))}
        okText="Yes"
        cancelText="No"
      >
        <FaUserTimes
          size={30}
        />
      </Popconfirm>
    )
  }

  return (
    <Tooltip
      placement="topRight"
      text="Only the host can kick players"
      trigger="click"
    >
      <FaUserTimes
        size={30}
      />
    </Tooltip>
  )
  
}

export default GamePlayersItemKick;