const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = model('category', categorySchema);

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  material: {
    type: String,
  },
  attrs: [
    {
      size: String,
      width: String,
      height: String,
      length: String,
      purchase_price: {
        type: Number,
        required: true,
      },
      sale_price: {
        type: Number,
      },
      avail: {
        type: Boolean,
        default: false,
      },
      qty: {
        type: Number,
        default: 0,
      },
    },
  ],
  updated_at: {
    type: Date,
    default: Date.now,
  },
  cat_id: {
    type: Schema.Types.ObjectId,
    ref: 'cateogry',
    required: true,
  },
});

productSchema.pre('save', function (next) {
  const product = this;

  // calculate sale price = purchase price * 10%
  product.attrs.sale_price = product.attrs.purchase_price * 0.1;
  if (product.attrs.qty > 0) {
    product.attrs.avail = true;
  }
  next();
});

const Product = model('product', productSchema);

module.exports = {
  Category,
  Product,
};
