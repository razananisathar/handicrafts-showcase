import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as actions from '../actions/actions';

import Showcase from '../components/Showcase';

const mapStateToProps = (state) => ({
  productList: state.catalog.productList,
});

const mapDispatchToProps = (dispatch) => ({});

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        {/* home page all products display*/}
        <Showcase productList={this.props.productList} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
