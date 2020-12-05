import { ReactReduxContext } from 'react-redux';
/**
 * @description Combine all reducers
 */
import { combineReducers } from 'redux';
import catalogReducers from './catalogReducer';

export default combineReducers({
  catalog: catalogReducers,
});
