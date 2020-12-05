import React from 'react';
import Product from '../components/product';

const Showcase = (props) => {
  const products = [];

  console.log(props.productList);

  props.productList.forEach((product) =>
    products.push(
      <Product
        key={product._id}
        name={product.name}
        desc={product.description}
      />
    )
  );

  return (
    <div className="showcase">
      <div className="hero">
        <p> Static image display</p>
      </div>
      {/* filter menu */}
      <div className="products-container">{products}</div>
    </div>
  );
};

export default Showcase;
