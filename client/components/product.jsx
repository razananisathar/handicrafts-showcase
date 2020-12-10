import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
  // console.log(props);
  return (
    <div className="product-card">
      <Link to={`/catalog/product/${props.id}`}>
        <img src={`/${props.photo}`} alt={props.photo} />
        <p>{props.name}</p>
      </Link>
    </div>
  );
};

export default Product;
