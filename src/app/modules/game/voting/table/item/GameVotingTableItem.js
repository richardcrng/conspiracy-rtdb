import React from 'react'
import { Grid } from 'semantic-ui-react';

function GameVotingTableItem({ name, isVoting }) {
  return (
    <Grid.Row>
      <Grid.Column><p>{name}</p></Grid.Column>
      <Grid.Column><p>{isVoting && "YES"}</p></Grid.Column>
    </Grid.Row>
  )
}

export default GameVotingTableItem;