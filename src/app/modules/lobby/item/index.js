import React from 'react';
import { MdExitToApp } from 'react-icons/md'

function LobbyItem({ name }) {
  return (
    <div className="d-flex justify-content-between" style={{ fontSize: "150%" }}>
      <strong>{name}</strong>
      <MdExitToApp size={30} />
    </div>
  )
}

export default LobbyItem;