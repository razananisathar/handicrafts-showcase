import React from 'react';

const Product = (props) => (
  <div className="product-card">
    <p>{props._id}</p>
    <p>{props.name}</p>
    <p>{props.desc}</p>
  </div>
);

export default Product;
