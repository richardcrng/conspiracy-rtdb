import React from 'react';
import GameVotingTable from './table';
import GameVotingVote from './vote';
import LinkButton from '../../../lib/molecules/LinkButton';
import { ROUTES } from '../../../constants/routes';

function GameVoting() {
  return (
    <>
      <div className="mb-3">
        <LinkButton
          basic
          color="primary"
          fill="outline"
          text="View role again"
          to={ROUTES.GameRole}
        />
      </div>
      <GameVotingTable />
      <GameVotingVote />
    </>
  )
}

export default GameVoting;