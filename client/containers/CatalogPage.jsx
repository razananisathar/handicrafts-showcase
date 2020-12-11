import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

import * as actions from '../actions/actions';
import Category from '../components/Category';
import CategoryCreator from '../components/CategoryCreator';

const mapStateToProps = ({ catalog: { categoryList } }) => ({
  categoryList,
});

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
    // form input values.
    const categoryName = event.target.querySelector('#categoryName').value;

    if (!categoryName) {
      // set error.
      this.setState((state) => {
        state.errorMessage = 'Category name required.';
        return state;
      });
    } else {
      // remove form error.
      this.setState((state) => {
        state.errorMessage = '';
        return state;
      });

      // clear input fields.
      event.target.querySelector('#categoryName').value = '';
      return this.props.addCategory(categoryName);
    }
  }

  render() {
    const categories = [];

    this.props.categoryList.forEach(({ _id, name }) =>
      categories.push(<Category key={`cat-${_id}`} name={name} id={_id} />)
    );

    return (
      <div className="container">
        {/* create a new category */}
        <CategoryCreator
          submit={this.submit}
          message={this.state.errorMessage}
        />
        {/* catalog page category display: products for each category*/}
        <h2 className="heading">Categories</h2>
        <div className="category-container">{categories}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
