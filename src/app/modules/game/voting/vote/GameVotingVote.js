import React from 'react'
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import classes from './GameVotingVote.module.css'
import { updatePlayer } from '../../../../../redux/saga/sagas';
import { useFirebaseUserUid, useFirebaseDatabaseValue } from 'provide-firebase-middleware/dist/hooks';

function GameVotingVote() {
  const dispatch = useDispatch()
  const key = useFirebaseUserUid()
  const voteCast = useFirebaseDatabaseValue(`players/${key}/vote`)
  const hasVoted = useFirebaseDatabaseValue(`players/${key}/isVoting`)

  const updateVoteHandler = ({ vote = null, isVoting = true }) => () => {
    if (voteCast && vote === voteCast) {
      dispatch(updatePlayer.trigger({ key, vote: null, isVoting: false }))
    } else {
      dispatch(updatePlayer.trigger({ key, isVoting, vote }))
    }
  }

  return (
    <div className={classes.GameVotingVote}>
      <GameVotingVoteButton
        onClick={updateVoteHandler({ vote: 'conspiracy' })}
        text="CONSPIRACY"
        color={voteCast === 'conspiracy' ? 'red' : null}
      />
      <GameVotingVoteButton
        onClick={updateVoteHandler({ vote: 'noConspiracy' })}
        text="NO CONSPIRACY"
        color={voteCast === 'noConspiracy' ? 'green' : null}
      />
      <GameVotingVoteButton
        disabled={!hasVoted}
        secondary
        onClick={updateVoteHandler({ isVoting: false })}
        text="WITHDRAW VOTE"
      />
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