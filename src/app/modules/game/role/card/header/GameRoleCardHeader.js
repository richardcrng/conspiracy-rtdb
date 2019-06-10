import React from 'react'
import { IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import {
  FaRegSmile,
  FaUserSecret
} from 'react-icons/fa';

function GameRoleCardHeader({ isInnocent, victim }) {
  const [subtitle, title] = isInnocent
    ? ["Victim: hopefully not you...", "INNOCENT"]
    : [`Victim: ${victim}`, "CONSPIRATOR"]

  const Icon = isInnocent
    ? FaRegSmile
    : FaUserSecret
  
  return (
    <IonCardHeader>
      <Icon color="black" size={128} />
      <IonCardTitle>
        {title}
      </IonCardTitle>
      <IonCardSubtitle>
        {subtitle}
      </IonCardSubtitle>
    </IonCardHeader>
  )
}

export default GameRoleCardHeader;