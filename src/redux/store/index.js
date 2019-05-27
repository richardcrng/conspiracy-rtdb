import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { reducer } from '../leaves';
import { firebaseMiddleware, firebaseInstance } from '../../firebase';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../saga';
import { getContext } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware({ context: { firebase: firebaseInstance } })
export const getFirebase = () => getContext('firebase')

const store = configureStore({
  reducer: reducer,
  middleware: [
    ...getDefaultMiddleware(),
    firebaseMiddleware,
    sagaMiddleware
  ]
})

sagaMiddleware.run(rootSaga)

export {
  store
}