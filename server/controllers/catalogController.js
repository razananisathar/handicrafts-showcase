const fs = require('fs');
const path = require('path');

const { Category, Product } = require('../models/catalog');

const catalogController = {};

/**
 * Add a new category.
 * @param {string} name
 */
catalogController.addCategory = async (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return next({
      log:
        'catalogController.addCategory: required param/s are empty or invalid data type/s',
      status: 406,
      message: {
        err: 'Invalid request params.',
      },
    });
  }

  try {
    const category = await new Category({ name }).save();
    res.locals.category = category;
    next();
  } catch (e) {
    return next({
      log: `catalogController.addCategory: ${JSON.stringify(e)}`,
      status: 500,
      message: {
        err: 'DB Error occurred',
      },
    });
  }
};

/**
 * Get a list of categories.
 *
 */
catalogController.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().exec();
    res.locals.categories = categories;
    next();
  } catch (e) {
    return next({
      log: `catalogController.getCategories: ${e}`,
      status: 500,
      message: {
        err: 'DB Error occurred',
      },
    });
  }
};

/**
 * Add a new product.
 * @param {string} name
 * @param {string} description
 * @param {object []} attrs
 * @param {string} catId category id
 */
catalogController.addProduct = async (req, res, next) => {
  const { name, description, material, attrs, catId, photo } = req.body;

  if (
    !name ||
    !catId ||
    typeof name !== 'string' ||
    typeof catId !== 'string'
  ) {
    return next({
      log:
        'catalogController.addProduct: required param/s are empty or invalid data type/s',
      status: 406,
      message: {
        err: 'Invalid request params.',
      },
    });
  }

  try {
    const product = await new Product({
      name,
      description,
      material,
      attrs,
      cat_id: catId,
      photo,
    }).save();
    res.locals.product = product;
    next();
  } catch (e) {
    return next({
      log: `catalogController.addProduct: ${e}`,
      status: 500,
      message: {
        err: 'DB Error occurred',
      },
    });
  }
};

/**
 * Get a list of products.
 */
catalogController.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().exec();
    res.locals.products = products;
    next();
  } catch (e) {
    return next({
      log: `catalogController.getProducts: ${e}`,
      status: 500,
      message: {
        err: 'DB Error occurred',
      },
    });
  }
};

/**
 * Get a product.
 * @param {string} id
 */
catalogController.getProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id || typeof id !== 'string') {
    return next({
      log: 'catalogController.getProduct: param id missing or invalid format',
      status: 406,
      message: {
        err: 'Invalid request params.',
      },
    });
  }

  try {
    const product = await Product.findById({ _id: id }).exec();

    const catId = product.cat_id;

    if (catId) {
      const category = await Category.findById({ _id: catId }).exec();
      product.set('cat_id', undefined, { strict: false });
      product.set('category', category, { strict: false });
      res.locals.product = product;
      next();
    }
  } catch (e) {
    return next({
      log: `catalogController.getProduct: ${e}`,
      status: 500,
      message: {
        err: 'DB Error occurred',
      },
    });
  }
};

/**
 * Update a product
 * @param {string} id
 */
catalogController.updateProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id || typeof id !== 'string') {
    return next({
      log:
        'catalogController.updateProduct: param id missing or invalid format',
      status: 406,
      message: {
        err: 'Invalid request params.',
      },
    });
  }

  const { name, description, material, attrs, catId } = req.body;
  if (
    !name ||
    !catId ||
    typeof name !== 'string' ||
    typeof catId !== 'string'
  ) {
    return next({
      log:
        'catalogController.updateProduct: required param/s are empty or invalid data type/s',
      status: 406,
      message: {
        err: 'Invalid request params.',
      },
    });
  }

  // @TBD update on pre state.
  // @TBD push to attrs
  // @TBD remove from attrs

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          description,
          material,
          cat_id: catId,
          'attrs.$[]': attrs,
        },
      },
      {
        new: true,
      }
    );

    const cid = product.cat_id;

    if (cid) {
      const category = await Category.findById({ _id: cid }).exec();
      product.set('cat_id', undefined, { strict: false });
      product.set('category', category, { strict: false });
      res.locals.product = product;
      next();
    }
  } catch (e) {
    return next({
      log: `catalogController.updateProduct: ${e}`,
      status: 500,
      message: {
        err: 'DB Error occurred',
      },
    });
  }
};

/**
 * Delete a product.
 * @param {string} id
 */
catalogController.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id || typeof id !== 'string') {
    return next({
      log:
        'catalogController.updateProduct: param id missing or invalid format',
      status: 406,
      message: {
        err: 'Invalid request params.',
      },
    });
  }

  try {
    const deleted = await Product.findByIdAndDelete({ _id: id });

    const { photo } = deleted;

    // delete the product image.
    if (photo !== 'None') {
      fs.unlink(path.resolve(__dirname, `../uploads/${photo}`), (err) => {
        if (err) {
          return next({
            log: `catalogController.deleteProduct: ${err}`,
            status: 500,
            message: {
              err: 'Unable to delete image file.',
            },
          });
        }

        res.locals.product = deleted;
        next();
      });
    } else {
      res.locals.product = deleted;
      next();
    }
  } catch (e) {
    return next({
      log: `catalogController.deleteProduct: ${e}`,
      status: 500,
      message: {
        err: 'DB Error occurred',
      },
    });
  }
};

module.exports = catalogController;
