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
          fill="outline"
          text="View role"
          to={ROUTES.GameRole}
        />
      </div>
      <GameVotingTable />
      <GameVotingVote />
    </>
  )
}

export default GameVoting;