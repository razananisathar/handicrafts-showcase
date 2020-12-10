import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const { pid } = ownProps.match.params;
  // console.log('mapStateToProps', state.catalog.product);
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
    const { pid } = this.props;
    if (this.props.pid !== prevProps.pid) {
      this.getProduct();
    }
  }

  getProduct() {
    const { pid } = this.props;
    this.props.fetchProduct(pid);
  }

  render() {
    const {
      _id,
      name,
      description,
      material,
      photo,
      attrs,
    } = this.props.product;

    // for (let val in this.props.product) {
    //   console.log(this.props.product[val]);
    // }

    return (
      <div className="container">
        {/* product page product display */}
        <section className="product-view">
          <h2>{name}</h2>
          <div>
            <img src={`/${photo}`} alt={photo} />
          </div>
          <div className="product-desc">
            <div>
              <h4>Description</h4>
              <p>{description}</p>
            </div>
            <div>
              <h4>Material(s)</h4>
              <p>{material}</p>
            </div>
            {/* <div>
              <h4>Specifications</h4>
              <div>
                <h5>Size</h5>
                <h5>Width</h5>
                <h5>Height</h5>
                <h5>Length</h5>
                <h5>Price</h5>
                <h5>Availability</h5>
              </div>
              {attrs.map(({ size }) => {
                return <p>size</p>;
              })}
            </div> */}
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
