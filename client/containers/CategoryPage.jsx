import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProductCreator from '../components/ProductCreator';
import Product from '../components/Product';
import * as actions from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  const { catId } = ownProps.match.params;

  // console.log('current catId', catId);
  // console.log('productList', state.catalog.productList.length);

  return {
    productList: state.catalog.productList,
    catId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProducts(catId) {
    dispatch(actions.displayProducts(catId));
  },
});

class CategoryPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.catId !== prevProps.catId) {
      this.getProducts();
    }
  }

  getProducts() {
    const { catId } = this.props;
    this.props.fetchProducts(catId);
  }

  render() {
    console.log(this.props.productList);

    const { productList } = this.props;

    const products = [];
    if (productList) {
      productList.forEach((product) => {
        products.push(
          <Product
            key={`pro-${product._id}`}
            name={product.name}
            desc={product.description}
            id={product._id}
          />
        );
      });
    }

    return (
      <div className="container">
        {/* create a new product */}
        <ProductCreator />
        <div className="products-container">
          {/* display products for each category*/}
          {products.length === 0 ? <h4>Products not available</h4> : products}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
);
