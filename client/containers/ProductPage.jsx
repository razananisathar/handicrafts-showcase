import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const { pid } = ownProps.match.params;
  console.log('mapStateToProps', state.catalog.product);
  return {
    product: state.catalog.product,
    pid,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProduct(id) {
    dispatch(actions.displayProduct(id));
  },
});

class ProductPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getProduct();
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps', prevProps.pid);
    console.log('presentProps', this.props.pid);
    const { pid } = this.props;
    if (this.props.pid !== prevProps.pid) {
      this.getProduct();
    }
  }

  getProduct() {
    console.log('getProduct', this.props.product);
    const { pid } = this.props;
    this.props.fetchProduct(pid);
  }

  render() {
    // console.log('render', this.props.product.name);
    const { product } = this.props;
    return (
      <div className="container">
        {/* product page product display */}
        {!product ? (
          <h4>Product not available</h4>
        ) : (
          <div class="product-view">
            <h2>{this.props.product.name}</h2>
            {/* <img src="" /> */}
            <div className="product-desc">
              <p>description</p>
              <p>material</p>
              <p>Sizes</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
