import * as R from 'ramda'
import React from 'react'
import { Button as SemButton } from 'semantic-ui-react';
// import { IonButton } from '@ionic/react'

function Button({ children, text, ...rest }, ref) {
  return (
    <SemButton ref={ref} {...rest}>
      {R.defaultTo(children, text)}
    </SemButton>
  )

  // return (
  //   <IonButton ref={ref} {...rest}>
  //     {R.defaultTo(children, text)}
  //   </IonButton>
  // )
}

// eslint-disable-next-line no-func-assign
Button = React.forwardRef(Button)

export default Button