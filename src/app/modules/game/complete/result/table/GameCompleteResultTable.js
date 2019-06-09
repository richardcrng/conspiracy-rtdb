import React from 'react'
import { Grid, Header } from 'semantic-ui-react';
import useGamePlayers from '../../../../../../helpers/hooks/gamePlayers';
import { useSelector } from 'react-redux';
import selectors from '../../../../../../redux/selectors';
import GameCompleteResultTableSegment from './segment';
import GameCompleteResultTableItem from './item';

const segments = ["Votes", "Roles", "Results"]

const headerDict = {
  Votes: "Vote",
  Roles: "Role",
  Results: "Result"
}

function GameCompleteResultTable() {
  const gameId = useSelector(selectors.getGameId)
  const playersArr = useGamePlayers(gameId, true)
  const [segment, setSegment] = React.useState(segments[0])

  return (
    <div style={{ padding: "20px" }}>
      <GameCompleteResultTableSegment
        {...{ segment, setSegment, segments }}
      />
      <div style={{ fontSize: "16px", paddingTop: "40px" }}>
        <Grid centered columns={2} divided="vertically">
          <Grid.Row>
            <Grid.Column><Header>Player</Header></Grid.Column>
            <Grid.Column><Header>{headerDict[segment]}</Header></Grid.Column>
          </Grid.Row>
          {playersArr.map(({ key, name, isInnocent, vote, winner }) => (
            <GameCompleteResultTableItem
              key={key}
              {...{ isInnocent, name, segment, vote, winner }}
            />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default GameCompleteResultTable;