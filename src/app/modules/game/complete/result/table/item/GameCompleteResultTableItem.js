import React from 'react'
import { Grid } from 'semantic-ui-react';
import { FaTrophy, FaUserSecret } from 'react-icons/fa';
import { GiAngelWings } from 'react-icons/gi';
import { VOTES } from '../../../../../../constants/votes';


function GameCompleteResultTableItem({ name, vote, winner }) {
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

export default GameCompleteResultTableItem