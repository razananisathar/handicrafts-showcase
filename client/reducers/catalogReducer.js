/**
 * Reducer for catalog data
 */

import * as types from '../constants/actionTypes';

const initialState = {
  error: null,
  isFetching: false,
  productList: [],
};

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
      };

    default:
      return state;
  }
};

export default catalogReducer;
