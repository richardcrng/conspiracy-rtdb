import _ from 'lodash';
import * as referenceFns from './references'
import { firebaseInstance } from '..';

const references = _.mapValues(
  referenceFns,
  referenceFn => _.curry(referenceFn)(firebaseInstance)
)

export default references