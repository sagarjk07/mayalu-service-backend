const _ = require('lodash');
const cloudinary = require('cloudinary');

const { User } = require('../models/user');
const { Product, validate } = require('../models/product');

getUserInfo = (productList) => {
  let dataArray = [];
  const result = productList.map(async (product) => {
    const data = await User.findById(product['userId']).select(['name', 'email']);
    dataArray = [...dataArray, data]
  })
  return result
}


exports.getProductList = async (req, res) => {
  let mergedProductList = [];
  const productList = await Product.find().sort('-createdAt');
  const userInfo = await User.find({ _id: { $in: productList.map(product => product.userId) } });
  productList.map((product) => {
    userInfo.map(user => {
      if (_.isEqual(product['userId'], user['_id'])) {
        mergedProductList.push({
          ...product._doc,
          userInfo: {
            name: user['name'],
            email: user['email']
          }
        })
      }
    })
  })
  return res.status(200).send(mergedProductList);
}

exports.postProduct = async (req, res) => {
  console.log(req.body);
  let result;
  const { error } = validate(req.body);
  console.log(error)

  if (error) return res.status(400).send(error.details[0].message);
  try {
    result = await cloudinary.v2.uploader.upload(req.file.path);
  } catch (exceptionError) {
    return res.status(400).send({
      error: exceptionError,
      message: 'Error while uploading image please try again later.'
    });
  }

  const product = new Product({
    title: req.body.title,
    images: [
      {
        url: result.secure_url,
        thumbnail: `https://res.cloudinary.com/dtp4trncl/image/upload/c_thumb,w_200,g_face/${result.public_id}.${result.format}`
      }
    ],
    description: req.body.description,
    categoryId: req.body.categoryId,
    price: req.body.price,
    userId: req.user.userId,
  });

  console.log(product)

  await product.save();
  return res.status(200).send('Product Added to List Successfully');
}
