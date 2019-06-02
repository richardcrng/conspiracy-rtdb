import * as R from 'ramda'
import React from 'react'
import { Button as SemButton } from 'semantic-ui-react';
// import { IonButton } from '@ionic/react'

function Button({ children, text, color, ...rest }, ref) {
  // Adjust for SemButton expected proptypes
  if (["primary", "secondary"].includes(color)) {
    rest[color] = true
  } else {
    rest.color = color
  }

  return (
    <SemButton ref={ref} {...rest}>
      {R.defaultTo(children, text)}
    </SemButton>
  )
}

// eslint-disable-next-line no-func-assign
Button = React.forwardRef(Button)

export default Button