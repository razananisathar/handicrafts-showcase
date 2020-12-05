/**
 * @description Central data source
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

import { loadProducts } from './actions/actions';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(loadProducts());

export default store;
