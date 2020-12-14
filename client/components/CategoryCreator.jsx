import React from 'react';

const CategoryCreator = (props) => (
  <div className="category-creator">
    <h3 className="form-title">Create New Category</h3>
    <form className="form-horizontal" onSubmit={props.submit.bind(this)}>
      <div>
        <label>Category Name</label>
        <input type="text" name="categoryName" id="categoryName" size="50" />
        <button type="submit" className="btn btn-info m-l-20">
          Add Category
        </button>
      </div>
      <p className="error-message">{props.message}</p>
    </form>
  </div>
);

export default CategoryCreator;
