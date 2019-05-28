import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import selectors from '../../../../../redux/selectors';
import GameVotingTableItem from './item';

function GameVotingTable() {
  const gamePlayersArr = useSelector(selectors.getGamePlayersArray)

  return (
    <div style={{ padding: "20px" }}>
      <Grid columns={2} divided="vertically">
        <Grid.Row>
          <Grid.Column><Header>Player</Header></Grid.Column>
          <Grid.Column><Header>Vote</Header></Grid.Column>
        </Grid.Row>
        {gamePlayersArr.map(({ key, name, isVoting }) => (
          <GameVotingTableItem key={key} {...{ name, isVoting }} />
        ))}
      </Grid>
    </div>
  )
}

export default GameVotingTable;