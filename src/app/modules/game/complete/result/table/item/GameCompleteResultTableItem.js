import React from 'react'
import { Grid } from 'semantic-ui-react';
import {
  // FaSmile,
  // FaThumbsDown,
  FaTrophy,
  // FaUserSecret
} from 'react-icons/fa';
// import { GiAngelWings } from 'react-icons/gi';
// import { MdDoNotDisturb } from 'react-icons/md';
import { VOTES } from '../../../../../../constants/votes';


function GameCompleteResultTableItem({ isInnocent, name, segment, vote, winner }) {
  const GameCompleteResultTableItemContent = () => {
    switch (segment) {
      case "Votes": return <GameCompleteResultTableItemVote vote={vote} />
      case "Roles": return <GameCompleteResultTableItemRole isInnocent={isInnocent} />
      case "Results": return <GameCompleteResultTableItemResult winner={winner} />
      default: return <GameCompleteResultTableItemVote vote={vote} />
    }
  }

  return (
    <Grid.Row>
      <Grid.Column><p style={{ fontSize: "16px" }}>{name}</p></Grid.Column>
      <Grid.Column>
        <GameCompleteResultTableItemContent />
      </Grid.Column>
      <Grid.Column>{winner && <FaTrophy size={36} color="gold" />}</Grid.Column>
    </Grid.Row>
  )
}

function GameCompleteResultTableItemRole({ isInnocent }) {
  return isInnocent
    ? <p style={{ color: "green" }}>Innocent</p>
    : <p style={{ color: "red" }}>Conspirator</p>
}

function GameCompleteResultTableItemVote({ vote }) {
  return vote === VOTES.conspiracy
    ? <p style={{ color: "red" }}>Conspiracy</p>
    : <p style={{ color: "green" }}>No conspiracy</p>
}

function GameCompleteResultTableItemResult({ winner }) {
  return winner
    ? <FaTrophy size={36} color="gold" />
    : <p style={{ color: "gray" }}>Loser :(</p>
}

export default GameCompleteResultTableItem