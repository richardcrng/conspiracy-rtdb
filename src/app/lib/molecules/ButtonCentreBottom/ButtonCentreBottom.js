import React from 'react';
import LinkButton from '../LinkButton';
import CentreBottom from '../../atoms/CentreBottom';

function ButtonCentreBottom({ children, ...rest }, ref) {
  return (
    <CentreBottom>
      <LinkButton
        ref={ref}
        color="primary"
        size="huge"
        {...rest}
      >
        {children}
      </LinkButton>
    </CentreBottom>
  )
}

// eslint-disable-next-line no-func-assign
ButtonCentreBottom = React.forwardRef(ButtonCentreBottom)

export default ButtonCentreBottom;