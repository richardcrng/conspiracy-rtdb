import React from 'react'
import { IonCard } from '@ionic/react';
import GameRoleCardHeader from './header';
import GameRoleCardContent from './content';

function GameRoleCard({ isInnocent, victim }) {
  return (
    <div style={{ textAlign: "left" }}>
      <IonCard>
        <GameRoleCardHeader {...{ isInnocent, victim }} />
        <GameRoleCardContent {...{ isInnocent, victim }} />
      </IonCard>
    </div>
  )
}

export default GameRoleCard;