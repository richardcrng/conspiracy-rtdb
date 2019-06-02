import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';
import { leaveGame, disbandGame } from '../../../../redux/saga/sagas';
import selectors from '../../../../redux/selectors';

function PopConfirmKick({ children, id: playerKey, placement = "top" }) {
  const dispatch = useDispatch()

  const isHost = useSelector(selectors.getIsUserHost)
  const ownKey = useSelector(selectors.getUserKey)
  const gameKey = useSelector(selectors.getUserCurrentGame)

  let popConfirmProps = {
    title: "Only the host can kick other players",
    okText: "Okay"
  }

  if (isHost && ownKey !== playerKey) { // trying to kick player
    popConfirmProps = {
      title: "Do you want to kick this player?",
      onConfirm: () => dispatch(leaveGame.trigger({ playerKey, gameKey })),
      okText: "Yes",
      cancelText: "No"
    }
  }

  else if (isHost) { // trying to kick self as host
    popConfirmProps = {
      title: "You are host - if you kick yourself, the game will be disbanded. Are you sure you want to do this?",
      onConfirm: () => dispatch(disbandGame.trigger()),
      okText: "Yes",
      cancelText: "No"
    }
  }

  else if (!playerKey || ownKey === playerKey) { // trying to leave game as non-host
    popConfirmProps = {
      title: "Do you want to leave this game?",
      onConfirm: () => dispatch(leaveGame.trigger({ playerKey, gameKey })),
      okText: "Yes",
      cancelText: "No"
    }
  }

  return (
    <Popconfirm
      placement={placement}
      {...popConfirmProps}
    >
      {children}
    </Popconfirm>
  )

}

export default PopConfirmKick;