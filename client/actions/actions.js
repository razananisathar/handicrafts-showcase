/**
 * Action Creators
 */

import * as types from '../constants/actionTypes';

export const loadProducts = () => (dispatch) => {
  fetch('/api')
    .then((data) => data.json())
    .then(({ products }) => {
      // console.log('retrieved', products);
      dispatch({
        type: types.LOAD_PRODUCTS,
        payload: products,
      });
    })
    .catch((error) => console.error(error)); /// @TBD handle error
};
