import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions/actions';
import Category from '../components/Category';
import CategoryCreator from '../components/CategoryCreator';

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    categoryList: state.catalog.categoryList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addCategory(name) {
    dispatch(actions.addCategory(name));
  },
});

class CatalogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();

    const categoryName = event.target.querySelector('#categoryName').value;

    if (!categoryName) {
      this.setState((state) => {
        state.errorMessage = 'Category name required.';
        return state;
      });
    } else {
      this.setState((state) => {
        state.errorMessage = '';
        return state;
      });
      return this.props.addCategory(categoryName);
    }
  }

  render() {
    const categories = [];

    this.props.categoryList.forEach((category) =>
      categories.push(
        <Category
          key={`cat-${category._id}`}
          name={category.name}
          id={category._id}
        />
      )
    );

    return (
      <div className="container">
        {/* create a new category */}
        <CategoryCreator
          submit={this.submit}
          message={this.state.errorMessage}
        />
        {/* catalog page category display*/}
        <div className="category-container">{categories}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
