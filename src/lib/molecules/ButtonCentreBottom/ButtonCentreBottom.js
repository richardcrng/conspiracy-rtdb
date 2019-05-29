import React from 'react';
import LinkButton from '../LinkButton';
import classes from './ButtonCentreBottom.module.css'

function ButtonCentreBottom({ children, ...rest }) {
  return (
    <div className={classes.ButtonCentreBottom}>
      <LinkButton
        size="huge"
        primary
        {...rest}
      >
        {children}
      </LinkButton>
    </div>
  )
}

export default ButtonCentreBottom;