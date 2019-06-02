import React from 'react'
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import InnerHTML from '../InnerHTML';

function Input({ label: Label, onChange, ...rest }) {
  const CoreInput = (
    <IonInput onIonChange={onChange} {...rest} />
  )

  if (Label) {
    return (
      <>
        <IonItem>
          <IonLabel>
            {
              typeof Label === "function"
                ? <Label />
                : typeof Label === "string"
                  ? <InnerHTML.span>{Label}</InnerHTML.span>
                  : Label
            }
          </IonLabel>
          {CoreInput}
        </IonItem>
      </>
    )
  }


  return CoreInput
}

export default Input;