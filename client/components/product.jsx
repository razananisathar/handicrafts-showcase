import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
  return (
    <div className="product-card">
      {props.catId ? (
        <button
          className="btn btn-remove"
          onClick={props.remove.bind(this, props.id)}
        >
          x
        </button>
      ) : (
        ''
      )}
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
