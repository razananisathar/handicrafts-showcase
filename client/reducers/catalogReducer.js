/**
 * Reducer for catalog data
 */

import * as types from '../constants/actionTypes';

const initialState = {
  // error: null,
  // isFetching: false,
  productList: [],
  categoryList: [],
  product: {
    _id: '',
    name: '',
    description: '',
    material: '',
    photo: null,
    attrs: [],
  },
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
      const { _id, name, description, photo, attrs, material } = action.payload;

      return {
        ...state,
        product: {
          _id,
          name,
          description,
          photo,
          material,
          attrs: attrs.slice(),
        },
      };

    case types.DISPLAY_PRODUCTS:
      return {
        ...state,
        productList: state.productList.filter(
          ({ cat_id }) => cat_id === action.payload
        ),
      };

    // @TBD test.
    case types.ADD_PRODUCT:
      return {
        ...state,
        productList: state.productList.concat(action.payload),
      };

    case types.UPLOAD_PRODUCT_IMAGE:
      return {
        ...state,
        product: { photo: action.payload },
      };
    default:
      return state;
  }
};

export default catalogReducer;
