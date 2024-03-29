import React from 'react';
import Product from './Product';
import banner from '../assets/images/handcraft.jpg';

const Showcase = (props) => {
  const products = [];

  props.productList.forEach(({ _id, name, photo, attrs }) => {
    products.push(
      <Product
        key={`pro-${_id}`}
        name={name}
        id={_id}
        photo={photo}
        price={attrs[0].sale_price}
        available={attrs[0].avail}
      />
    );
  });

  return (
    <div className="showcase">
      <div className="hero">{/* <img src={banner} /> */}</div>
      <h2 className="heading">Sri Lankan Arts and Crafts</h2>
      {/* filter menu */}
      <div className="products-container">{products}</div>
    </div>
  );
};

export default Showcase;
