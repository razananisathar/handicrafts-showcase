/**
 * @description Central data source
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

import { loadAllProducts, loadCategories } from './actions/actions';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

// store.dispatch(loadAllProducts());
// store.dispatch(loadCategories());

export default store;
