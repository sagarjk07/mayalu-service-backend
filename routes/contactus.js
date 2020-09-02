const express = require('express');

const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/async');
const { postMessageToSeller } = require('../controllers/contactus.controller');

const router = express.Router();

router.post('/', auth, asyncMiddleware(postMessageToSeller));


module.exports = router;
