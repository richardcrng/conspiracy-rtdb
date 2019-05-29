import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedSync from './sync';
import Online from '../online';
import { ROUTES } from '../../constants/routes';
import Profile from '../profile';
import AppLayout from '../../common/layout';

function Protected() {
  return (
    <AppLayout>
      <ProtectedSync />
      <Switch>
        <Route path={ROUTES.Profile} component={Profile} />
        <Route path="/" component={Online} />
      </Switch>
    </AppLayout>
  )
}

export default Protected;