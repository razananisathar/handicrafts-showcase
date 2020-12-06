import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state, ownProps) => ({
  pid: ownProps.match.params.pid,
});

const mapDispatchToProps = (dispatch) => ({});

class ProductPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    // this.props.dispatch(actions.displayProduct(this.props.pid));
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps', prevProps);
    console.log('presentProps', this.props);
  }

  render() {
    return (
      <div className="container">
        {/* product page product display*/}
        <h2>Title</h2>
        {/* <img src="" /> */}
        <div className="product-desc">
          <p>description</p>
          <p>material</p>
          <p>Sizes</p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
