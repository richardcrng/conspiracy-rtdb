import { configureStore } from 'redux-starter-kit';
import { reducer } from '../leaves';

export const store = configureStore({
  reducer: reducer
})