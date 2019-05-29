import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import 'antd-mobile/dist/antd-mobile.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

import { store } from './redux/store';
import { FirebaseProvider } from './firebase';
import RouterProvider from './app/providers/router/RouterProvider';

function Root() {
  return (
    <FirebaseProvider>
      <Provider store={store}>
        <RouterProvider>
          <App />
        </RouterProvider>
      </Provider>
    </FirebaseProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
