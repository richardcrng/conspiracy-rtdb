import React from 'react'
import { Grid, Header } from 'semantic-ui-react';
import useGamePlayers from '../../../../../helpers/hooks/gamePlayers';
import { useSelector } from 'react-redux';
import selectors from '../../../../../redux/selectors';
import { VOTES } from '../../../../constants/votes';

function GameCompleteTable() {
  const gameId = useSelector(selectors.getGameId)
  const playersArr = useGamePlayers(gameId, true)

  return (
    <div style={{ padding: "20px" }}>
      <Grid columns={3} divided="vertically">
        <Grid.Row>
          <Grid.Column><Header>Player</Header></Grid.Column>
          <Grid.Column><Header>Vote</Header></Grid.Column>
          <Grid.Column><Header>Winner</Header></Grid.Column>
        </Grid.Row>
        {playersArr.map(({ key, name, vote, winner }) => (
          <GameCompleteTableItem key={key} {...{ name, vote, winner }} />
        ))}
      </Grid>
    </div>
  )
}

function GameCompleteTableItem({ name, vote, winner }) {
  return (
    <Grid.Row>
      <Grid.Column><p>{name}</p></Grid.Column>
      <Grid.Column><p>{vote === VOTES.conspiracy ? 'Conspiracy' : 'No Conspiracy'}</p></Grid.Column>
      <Grid.Column><p>{winner ? 'YES' : 'NO'}</p></Grid.Column>
    </Grid.Row>
  )
}

export default GameCompleteTable;