import React from 'react'
import { FaUserTimes } from 'react-icons/fa';
import PopConfirmKick from '../../../../../lib/molecules/PopConfirmKick';

function GamePlayersItemKick({ id }) {

  return (
    <PopConfirmKick
      id={id}
      placement="topRight"
    >
      <FaUserTimes
        size={30}
      />
    </PopConfirmKick>
  )
  
}

export default GamePlayersItemKick;