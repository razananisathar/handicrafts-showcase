import React from 'react';
import Product from './Product';
import banner from '../assets/images/banner.jpeg';

const Showcase = (props) => {
  const products = [];

  props.productList.forEach(({ _id, name, photo }) => {
    products.push(
      <Product key={`pro-${_id}`} name={name} id={_id} photo={photo} />
    );
  });

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
