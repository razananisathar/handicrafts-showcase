import React from 'react';
import AddProductAttributes from './AddProductAttributes';

const ProductCreator = (props) => {
  return (
    <div className="product-creator">
      <h3 className="form-title">Create a New Product</h3>
      <form id="productForm" onSubmit={props.submit.bind(this)}>
        <div className="form-row">
          <label>Category</label>
          <input
            type="text"
            name="category"
            id="category"
            data-catid={props.catId}
            value={props.catName}
            disabled
          />
          {/* <select name="category" id="category" className="">
            {props.categoryList.map(({ _id, name }) => {
              return (
                <option key={`cat-${_id}`} value={_id}>
                  {name}
                </option>
              );
            })}
          </select> */}
        </div>
        <div className="form-row">
          <label>Name</label>
          <input type="text" name="name" id="name" />
          <p className="error-message">{props.message}</p>
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea name="description" id="description" rows="10"></textarea>
        </div>
        <div className="form-row">
          <label>Material</label>
          <input type="text" name="material" id="material" />
        </div>
        <div className="form-row">
          <label>Attributes</label>
          <AddProductAttributes />
        </div>
        <div className="form-row">
          <label>Image</label>
          <input type="file" name="image" id="image" />
        </div>

        <div className="form-row">
          <button type="submit" className="btn btn-info">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreator;
