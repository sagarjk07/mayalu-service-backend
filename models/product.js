const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 5,
    required: true
  },
  images: {
    type: Array,
  },
  categoryId: {
    type: Number,
    required: true,
    max: 255
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

const validateProductInfo = (reqProductInfo) => {
  const schema = Joi.object({
    images: Joi.array().allow(''),
    price: Joi.number().required(),
    title: Joi.string().min(5).required(),
    categoryId: Joi.number().max(255).required(),
    description: Joi.string().allow('')
  });
  return schema.validate(reqProductInfo);
}

exports.Product = Product;
exports.productSchema = productSchema;
exports.validate = validateProductInfo;
