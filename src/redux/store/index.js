import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { reducer } from '../leaves';
import { firebaseMiddleware } from '../../firebase';

export const store = configureStore({
  reducer: reducer,
  middleware: [
    ...getDefaultMiddleware(),
    firebaseMiddleware
  ]
})