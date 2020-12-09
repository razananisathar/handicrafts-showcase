import React from 'react';
import Product from './Product';
import banner from '../assets/images/banner.jpeg';

const Showcase = (props) => {
  const products = [];

  props.productList.forEach((product) =>
    products.push(
      <Product
        key={`pro-${product._id}`}
        name={product.name}
        desc={product.description}
        id={product._id}
        photo={product.photo}
      />
    )
  );

  return (
    <div className="showcase">
      <div className="hero">
        <img src={banner} />
      </div>
      {/* filter menu */}
      <div className="products-container">{products}</div>
    </div>
  );
};

export default Showcase;
