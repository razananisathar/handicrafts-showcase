import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from '../components/Product';

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = () => ({});

class CategoryPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="products-container">
          {/* display products for each category*/}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
