import * as R from 'ramda';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

function LinkButton({ to, text, disabled, children, ...rest }) {
  const CoreButton = () => (
    <Button {...rest} disabled={disabled}>
      {R.defaultTo(children, text)}
    </Button>
  )

  return to && !disabled
    ? <Link to={to}><CoreButton /></Link>
    : <CoreButton />
}

export default LinkButton;