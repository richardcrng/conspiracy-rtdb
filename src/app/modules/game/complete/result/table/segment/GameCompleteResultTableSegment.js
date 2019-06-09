import React from 'react'
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

function GameCompleteResultTableSegment({ segment, setSegment, segments }) {
  return (
    <IonSegment>
      {
        segments.map(label => (
          <GameCompleteResultTableSegmentItem
            key={label}
            {...{ label, segment, setSegment }}
          />
        ))
      }
    </IonSegment>
  )
}

function GameCompleteResultTableSegmentItem({ label, segment, setSegment  }) {
  return (
    <IonSegmentButton
      checked={segment === label}
      onClick={() => setSegment(label)}
    >
      <IonLabel>{label}</IonLabel>
    </IonSegmentButton>
  )
}

export default GameCompleteResultTableSegment;