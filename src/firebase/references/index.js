import _ from 'lodash';
import * as referenceFns from './references'
import { firebaseInstance } from '../../redux/store';

const references = _.mapValues(
  referenceFns,
  referenceFn => _.curry(referenceFn)(firebaseInstance)
)

export default references