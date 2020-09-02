const express = require('express');

require('../middleware/cloudinary');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const asyncMiddleware = require('../middleware/async');

const { postProduct, getProductList } = require('../controllers/product.controller');

const router = express.Router();

router.get('/', asyncMiddleware(getProductList));
router.post('/', [auth, upload], asyncMiddleware(postProduct));


module.exports = router;
