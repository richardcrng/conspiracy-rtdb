import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

function GameVotingVotes() {

  return (
    <div style={{ padding: "20px" }}>
      <Grid columns={2} divided="vertically">
        <Grid.Row>
          <Grid.Column><Header>Player</Header></Grid.Column>
          <Grid.Column><Header>Votes</Header></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default GameVotingVotes;