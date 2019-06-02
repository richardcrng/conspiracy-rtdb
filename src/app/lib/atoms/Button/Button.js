import * as R from 'ramda'
import React from 'react'
import { IonButton } from '@ionic/react'

function Button({ children, text, ...rest }) {
  return (
    <IonButton {...rest}>
      {R.defaultTo(children, text)}
    </IonButton>
  )
}

export default Button