/**
 * Reducer for catalog data
 */

import * as types from '../constants/actionTypes';

const initialState = {
  // error: null,
  // isFetching: false,
  productList: [],
  categoryList: [],
};

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_ALLPRODUCTS:
      return {
        ...state,
        productList: action.payload,
      };

    case types.LOAD_CATEGORIES:
      return {
        ...state,
        categoryList: action.payload,
      };

    case types.ADD_CATEGORY:
      return {
        ...state,
        categoryList: state.categoryList.concat(action.payload),
      };

    case types.DISPLAY_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    default:
      return state;
  }
};

export default catalogReducer;
