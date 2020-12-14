import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProductCreator from '../components/ProductCreator';
import Product from '../components/Product';
import * as actions from '../actions/actions';

const mapStateToProps = (
  { catalog: { productList, categoryList, product } },
  ownProps
) => {
  const { catId, catName } = ownProps.match.params;

  return {
    productList,
    categoryList,
    product,
    catId,
    catName,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProducts(catId) {
    dispatch(actions.displayProducts(catId));
  },
  uploadPhoto(image) {
    dispatch(actions.uploadPhoto(image));
  },
  addProduct(product) {
    dispatch(actions.addProduct(product));
  },
  deleteProduct(id) {
    dispatch(actions.deleteProduct(id));
  },
});

class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      formData: {
        name: '',
        description: '',
        catId: '',
        photo: '',
        attrs: [],
        material: '',
      },
    };

    this.submit = this.submit.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    const {
      catId,
      product: { photo },
    } = this.props;
    if (catId !== prevProps.catId) {
      this.getProducts();
    }

    if (photo !== prevProps.product.photo) {
      // @TBD object mutation.. why this not.
      // this.setState((state) => {
      //   state.formData = { ...state.formData, photo };
      //   console.log('state', state);
      //   return state;
      // });

      // console.log(this.state.formData.photo);
      this.props.addProduct({ ...this.state.formData, photo });
    }
  }

  getProducts() {
    const { catId } = this.props;
    this.props.fetchProducts(catId);
  }

  remove(id, event) {
    event.preventDefault();
    this.props.deleteProduct(id);
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
      const image = event.target.querySelector('#image').files[0] || null;

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

      this.setState((state) => {
        state.errorMessage = '';
        state.formData = {
          ...state.formData,
          catId,
          name,
          description,
          material,
          attrs,
        };

        return state;
      });

      // @TBD image field validation.
      if (image) {
        const data = new FormData();
        data.append('photo', image);
        this.props.uploadPhoto(data);
      } else {
        // @TBD add object without an image.
        // this.props.addProduct(this.state.formData);
      }
    }
  }

  render() {
    const { productList, catId } = this.props;

    const products = [];
    if (productList) {
      productList.forEach(({ _id, name, description, photo }) => {
        products.push(
          <Product
            key={`pro-${_id}`}
            name={name}
            desc={description}
            id={_id}
            photo={photo}
            catId={catId}
            remove={this.remove}
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
        <h2 className="heading">{this.props.catName} Products</h2>
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
