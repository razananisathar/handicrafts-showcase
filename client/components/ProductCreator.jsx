import React from 'react';

const ProductCreator = (props) => (
  <div className="product-creator">
    <h3>Create a New Product</h3>
    <form>
      <label>Category</label>
      <select name="category" id="category" className=""></select>
      <label>Product Name</label>
      <input type="text" name="name" id="name" />
    </form>
  </div>
);

export default ProductCreator;
