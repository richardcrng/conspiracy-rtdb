import React from 'react'
import { Grid, Header } from 'semantic-ui-react';
import { FaTrophy, FaUserSecret } from 'react-icons/fa';
import { GiAngelWings } from 'react-icons/gi';
import useGamePlayers from '../../../../../../helpers/hooks/gamePlayers';
import { useSelector } from 'react-redux';
import selectors from '../../../../../../redux/selectors';
import { VOTES } from '../../../../../constants/votes';

function GameCompleteResultTable() {
  const gameId = useSelector(selectors.getGameId)
  const playersArr = useGamePlayers(gameId, true)

  return (
    <div style={{ padding: "20px" }}>
      <Grid centered columns={3} divided="vertically">
        <Grid.Row>
          <Grid.Column><Header>Player</Header></Grid.Column>
          <Grid.Column><Header>Vote</Header></Grid.Column>
          <Grid.Column><Header>Winner</Header></Grid.Column>
        </Grid.Row>
        {playersArr.map(({ key, name, vote, winner }) => (
          <GameCompleteResultTableItem key={key} {...{ name, vote, winner }} />
        ))}
      </Grid>
    </div>
  )
}

function GameCompleteResultTableItem({ name, vote, winner }) {
  // const color = winner ? "olive" : "red"

  return (
    <Grid.Row>
      <Grid.Column><p style={{ fontSize: "16px" }}>{name}</p></Grid.Column>
      <Grid.Column>
        {vote === VOTES.conspiracy
          ? <FaUserSecret size={36} /> 
          : <GiAngelWings size={36} />
        }
      </Grid.Column>
      <Grid.Column>{winner && <FaTrophy size={36} color="gold" />}</Grid.Column>
    </Grid.Row>
  )
}

export default GameCompleteResultTable;