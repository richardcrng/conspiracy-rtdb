import { configureStore } from 'redux-starter-kit';
import { reducer } from '../leaves';

const store = configureStore({
  reducer: reducer
})

export const store