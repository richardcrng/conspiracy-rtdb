import React from 'react';
import LinkButton from '../LinkButton';
import classes from './ButtonCentreBottom.module.css'

function ButtonCentreBottom({ children, ...rest }, ref) {
  return (
    <div className={classes.ButtonCentreBottom}>
      <LinkButton
        ref={ref}
        // color="primary"
        // size="large"
        size="huge"
        {...rest}
      >
        {children}
      </LinkButton>
    </div>
  )
}

// eslint-disable-next-line no-func-assign
ButtonCentreBottom = React.forwardRef(ButtonCentreBottom)

export default ButtonCentreBottom;