import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
  // console.log(props);
  return (
    <div className="product-card">
      <Link to={`/catalog/product/${props.id}`}>
        <img src={`/${props.photo}`} alt={props.photo} />
        <div>
          <p>{props.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
