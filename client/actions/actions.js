/**
 * Action Creators
 */

import * as types from '../constants/actionTypes';

/**
 * fetch all products.
 */
export const loadAllProducts = () => (dispatch) => {
  fetch('/api')
    .then((data) => data.json())
    .then(({ products }) => {
      dispatch({
        type: types.LOAD_ALLPRODUCTS,
        payload: products,
      });
    })
    .catch((error) => console.error(error)); /// @TBD handle error
};

/**
 * get a product by id.
 * @param {*} id
 */
export const displayProduct = (id) => (dispatch) => {
  fetch(`/api/catalog/product/${id}`)
    .then((data) => data.json())
    .then((product) => {
      console.log('Product', product);
      dispatch({
        type: types.DISPLAY_PRODUCT,
        payload: product,
      });
    })
    .catch((error) => console.error(error));
};

/**
 * load all categories.
 */
export const loadCategories = () => (dispatch) => {
  fetch('/api/catalog/category')
    .then((data) => data.json())
    .then(({ categories }) => {
      dispatch({
        type: types.LOAD_CATEGORIES,
        payload: categories,
      });
    })
    .catch((error) => console.error(error));
};

/**
 * add a new category.
 * @param {*} name
 */
export const addCategory = (name) => (dispatch) => {
  fetch('/api/catalog/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
    .then((data) => data.json())
    .then(({ category }) => {
      dispatch({
        type: types.ADD_CATEGORY,
        payload: category,
      });
    })
    .catch((error) => console.log(error));
};

/**
 * 
 */
export const displayProducts = (catId) => ({
  type: types.DISPLAY_PRODUCTS,
  payload: catId,
});
