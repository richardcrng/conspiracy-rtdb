import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classes from './GameVotingVote.module.css'
import { updatePlayer } from '../../../../../redux/saga/sagas';
import selectors from '../../../../../redux/selectors';
import { Button } from 'semantic-ui-react';

function GameVotingVote() {
  const dispatch = useDispatch()
  const key = useSelector(selectors.getUserKey)
  const voteCast = useSelector(selectors.getUserVote)
  const hasVoted = useSelector(selectors.getIsUserVoting)
  const isDay = useSelector(selectors.getIsDayInGame)

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
        disabled={!isDay}
        onClick={updateVoteHandler({ vote: 'conspiracy' })}
        text="CONSPIRACY"
        color={voteCast === 'conspiracy' ? 'red' : null}
      />
      <GameVotingVoteButton
        disabled={!isDay}
        onClick={updateVoteHandler({ vote: 'noConspiracy' })}
        text="NO CONSPIRACY"
        color={voteCast === 'noConspiracy' ? 'green' : null}
      />
      <GameVotingVoteButton
        disabled={!hasVoted || !isDay}
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
      className="d-block my-2"
      expand="block"
      size="large"
      {...rest}
    >
      {text}
    </Button>
  )
}

export default GameVotingVote;