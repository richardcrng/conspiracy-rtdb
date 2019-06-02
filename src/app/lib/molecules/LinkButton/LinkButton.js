import * as R from 'ramda';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../atoms/Button';

function LinkButton({ to, text, disabled, children, ...rest }, ref) {
  const CoreButton = () => (
    <Button ref={ref} {...rest} disabled={disabled}>
      {R.defaultTo(children, text)}
    </Button>
  )

  return to && !disabled
    ? <Link to={to}><CoreButton /></Link>
    : <CoreButton />
}

// eslint-disable-next-line no-func-assign
LinkButton = React.forwardRef(LinkButton)

export default LinkButton;