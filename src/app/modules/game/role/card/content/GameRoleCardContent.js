import React from 'react'
import { IonCardContent } from '@ionic/react';

function GameRoleCardContent({ isInnocent, victim }) {
  let content

  if (isInnocent) {
    content = (
      <>
        <p>Either everybody else is innocent with you...</p>
        <p>Or <i>they're all in a conspiracy against you!</i></p>
        <p>Good luck...</p>
      </>
    )
  } else {
    content = (
      <>
        <p>You and all other players are in a <b>conspiracy against {victim}</b>.</p>
        <p>Don't let on!</p>
      </>
    )
  }

  return (
    <IonCardContent>
      {content}
    </IonCardContent>
  )
}

export default GameRoleCardContent;