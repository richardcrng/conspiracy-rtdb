import _ from 'lodash';
import * as curryableReferences from './references'
import { firebaseInstance } from '../../redux/store';

const references = _.mapValues(
  curryableReferences,
  curryableFn => curryableFn(firebaseInstance)
)

export default references