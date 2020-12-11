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

    const specs = [];

    // attrs component.
    attrs.forEach(
      ({ size, width, height, length, sale_price, avail }, index) => {
        specs.push(
          <div className="product-specs" key={`spec-${index}`}>
            <div>
              <p>{size}</p>
            </div>
            <div>
              <p>{width}</p>
            </div>
            <div>
              <p>{height}</p>
            </div>
            <div>
              <p>{length}</p>
            </div>
            <div>
              <p>{sale_price.toFixed(2)}</p>
            </div>
            <div>
              <p>{avail ? 'Yes' : 'No'}</p>
            </div>
          </div>
        );
      }
    );

    return (
      <div className="container">
        {/* product page product display */}
        <section>
          <h2>{name}</h2>
          <div className="product-view">
            <div className="product-img">
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
              <div>
                <h4>Specifications</h4>
                <div className="product-specs spec-heading">
                  <div>
                    <h5>Size</h5>
                  </div>
                  <div>
                    <h5>Width (inches)</h5>
                  </div>
                  <div>
                    <h5>Height (inches)</h5>
                  </div>
                  <div>
                    <h5>Length (inches)</h5>
                  </div>
                  <div>
                    <h5>Sale Price ($)</h5>
                  </div>
                  <div>
                    <h5>Availability</h5>
                  </div>
                </div>
                {specs}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
