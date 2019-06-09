import React from 'react';
import { Provider } from 'react-redux';

import './index.css';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import 'semantic-ui-css/semantic.min.css'
import App from './app';

import { IonApp } from '@ionic/react';
import { store } from './redux/store';
import { FirebaseProvider } from './firebase';
import RouterProvider from './app/providers/router/RouterProvider';

function Root() {
  return (
    <IonApp>
      <FirebaseProvider>
        <Provider store={store}>
          <RouterProvider>
            <App />
          </RouterProvider>
        </Provider>
      </FirebaseProvider>
    </IonApp>
  )
}

export default Root