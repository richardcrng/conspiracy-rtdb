import React from 'react'
import { Button } from 'semantic-ui-react';
import classes from './GameVotingVote.module.css'

function GameVotingVote() {
  return (
    <div className={classes.GameVotingVote}>
      <GameVotingVoteButton text="CONSPIRACY" color="red" />
      <GameVotingVoteButton text="NO CONSPIRACY" color="green" />
      <GameVotingVoteButton text="WITHDRAW VOTE" />
    </div>
  )
}

function GameVotingVoteButton({ text, ...rest }) {
  return (
    <Button
      fluid
      className="d-block my-2"
      size="big"
      {...rest}
    >
      {text}
    </Button>
  )
}

export default GameVotingVote;