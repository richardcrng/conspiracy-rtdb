import reduxLeaves from 'redux-leaves'
import { intialState } from '../initialState';

const [reducer, actions] = reduxLeaves(intialState)

export {
  reducer,
  actions
}