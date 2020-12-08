import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProductCreator from '../components/ProductCreator';
import Product from '../components/Product';
import * as actions from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  const { catId, catName } = ownProps.match.params;

  // console.log('current catId', catId);
  // console.log('productList', state.catalog.productList.length);

  return {
    productList: state.catalog.productList,
    categoryList: state.catalog.categoryList,
    catId,
    catName,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProducts(catId) {
    dispatch(actions.displayProducts(catId));
  },
  addProduct(product) {
    dispatch(actions.addProduct(product));
  },
});

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      errorMessage: '',
    };
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

  submit(event) {
    event.preventDefault();

    const name = event.target.querySelector('#name').value;

    // @TBD Update attributes form as an array of objects.
    if (!name) {
      this.setState((state) => {
        state.errorMessage = 'Product name required.';
        return state;
      });
    } else {
      const catId = event.target.querySelector('#category').dataset.catid;
      const description =
        event.target.querySelector('#description').value || null;
      const material = event.target.querySelector('#material').value || null;
      const size = event.target.querySelector('#size').value;
      const width = event.target.querySelector('#width').value || 0;
      const height = event.target.querySelector('#height').value || 0;
      const length = event.target.querySelector('#length').value || 0;
      const qty = event.target.querySelector('#qty').value || 0;
      const purchasePrice =
        event.target.querySelector('#purchasePrice').value || 0.0;
      const image = event.target.querySelector('#image').files[0] || null;

      const attrs = [];

      // attrs is an array of object.
      //@TBD. for now it is a single object in an array.
      attrs.push({
        size,
        width,
        height,
        length,
        qty,
        purchase_price: purchasePrice,
      });
      // save product.
      this.props.addProduct({
        catId,
        name,
        description,
        material,
        attrs,
        image,
      });

      this.setState((state) => {
        state.errorMessage = '';
        return state;
      });
    }
  }

  render() {
    // console.log(this.props.productList);

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
        <ProductCreator
          catId={this.props.catId}
          catName={this.props.catName}
          // categoryList={this.props.categoryList}
          submit={this.submit}
          message={this.state.errorMessage}
        />
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
