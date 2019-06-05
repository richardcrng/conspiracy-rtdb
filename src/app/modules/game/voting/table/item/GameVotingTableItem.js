import React from 'react'
import { Grid } from 'semantic-ui-react';
import { FaCheck } from 'react-icons/fa';

function GameVotingTableItem({ name, isVoting }) {
  return (
    <Grid.Row>
      <Grid.Column><p style={{ fontSize: "16px" }}>{name}</p></Grid.Column>
      <Grid.Column>{isVoting && <FaCheck />}</Grid.Column>
    </Grid.Row>
  )
}

export default GameVotingTableItem;