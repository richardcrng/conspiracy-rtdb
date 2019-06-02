import * as R from 'ramda'
import React from 'react'
import { IonButton } from '@ionic/react'

function Button({ children, text, ...rest }, ref) {
  return (
    <IonButton ref={ref} {...rest}>
      {R.defaultTo(children, text)}
    </IonButton>
  )
}

// eslint-disable-next-line no-func-assign
Button = React.forwardRef(Button)

export default Button