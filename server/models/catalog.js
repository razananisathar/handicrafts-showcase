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
  photo: {
    type: String,
    default: 'None',
  },
  attrs: [
    {
      size: String,
      width: Number,
      height: Number,
      length: Number,
      purchase_price: {
        type: Number,
        required: true,
      },
      sale_price: {
        type: Number,
        require: true,
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
  const self = this;

  self.attrs.forEach((product) => {
    // calculate sale price = purchase price * 10%
    product.sale_price = parseFloat((product.purchase_price * 1.1).toFixed(2));
    if (product.qty > 0) {
      product.avail = true;
    }
  });

  next();
});

// @TBD update for sale price and avail
// productSchema.pre('findOneAndUpdate', function (next) {
//   const self = this;

//   console.log(self);
//   console.log(self.getQuery());

//   self.attrs.forEach((product) => {
//     // calculate sale price = purchase price * 10%
//     product.sale_price = parseFloat((product.purchase_price * 1.1).toFixed(2));
//     if (product.qty > 0) {
//       product.avail = true;
//     }
//   });

//   next();
// });

const Product = model('product', productSchema);

module.exports = {
  Category,
  Product,
};
