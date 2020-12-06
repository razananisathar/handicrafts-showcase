import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => (
  <div className="product-card">
    <Link to={`catalog/product/${props.id}`}>
      <p>{props.name}</p>
      <p>{props.desc}</p>
    </Link>
  </div>
);

export default Product;
