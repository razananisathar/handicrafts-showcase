import React from 'react';
import Product from '../components/product';
import banner from '../assets/images/banner.jpeg';

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
        <img src={banner} />
      </div>
      {/* filter menu */}
      <div className="products-container">{products}</div>
    </div>
  );
};

export default Showcase;
