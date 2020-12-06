import React from 'react';

const CategoryCreator = (props) => (
  <div className="category-creator">
    <h3>Create New Category</h3>
    <form onSubmit={props.submit.bind(this)}>
      <label>CategoryName</label>
      <input type="text" name="categoryName" id="categoryName" />
      <button type="submit" className="btn btn-info">
        Add Category
      </button>
      <p className="error-message">{props.message}</p>
    </form>
  </div>
);

export default CategoryCreator;
