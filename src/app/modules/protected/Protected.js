import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedSync from './sync';
import Online from '../online';
import { ROUTES } from '../../constants/routes';
import Profile from '../profile';

function Protected() {
  return (
    <>
      <ProtectedSync />
      <Switch>
        <Route path={ROUTES.Profile} component={Profile} />
        <Route path="/" component={Online} />
      </Switch>
    </>
  )
}

export default Protected;