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
        <div className="pro-details">
          <p>{props.name}</p>
          {props.hasOwnProperty('price') ? (
            <p className="p-price">{`$${
              props.price ? props.price.toFixed(2) : ''
            }`}</p>
          ) : (
            ''
          )}
          {props.hasOwnProperty('available') ? (
            <p className={!props.available ? 'p-available' : ''}>{`${
              props.available ? '' : 'Out of stock'
            }`}</p>
          ) : (
            ''
          )}
        </div>
      </Link>
    </div>
  );
};

export default Product;
