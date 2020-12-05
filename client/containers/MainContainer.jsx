import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import Navbar from '../components/nav';
import Showcase from '../components/showcase';

const mapStateToProps = (state) => ({
  productList: state.catalog.productList,
});

const mapDispatchToProps = (dispatch) => ({});

class MainContainer extends Component {
  constructor(props) {
    super(props);
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        {/* navbar */}
        <Navbar />
        {/* home page products display*/}
        <Showcase productList={this.props.productList} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
