import React from 'react';
import LinkButton from '../../../lib/molecules/LinkButton';
import { ROUTES } from '../../../constants/routes';
import SetupGameForm from './form';

function SetupGame() {
  return (
    <>
      <h1>Host New Game</h1>
      <div className="mb-3">
        <LinkButton
          basic
          fill="outline"
          text="Back to lobby"
          to={ROUTES.Lobby}
        />
      </div>
      <SetupGameForm />
    </>
  )
}

export default SetupGame;