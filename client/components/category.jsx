import React from 'react';
import { Link } from 'react-router-dom';

const Category = (props) => (
  <Link to={`/catalog/${props.name}/${props.id}`}>
    <div className="category-card">
      <p>{props.name}</p>
    </div>
  </Link>
);

export default Category;
