const _ = require('lodash');
const bcrypt = require('bcrypt');

const { User, validate } = require('../models/user');


exports.getUserInfo = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).send(user);
}

exports.registerUserInfo = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save()
  const token = user.generateAuthToken();
  // res.header('x-auth-token', token).status(200).send(_.pick(user, ['_id', 'name', 'email', 'password']));
  res.header('x-auth-token', token).status(200).send({
    'id': user._id,
    'name': user.name,
    'email': user.email,
    'password': user.password
  });

}

exports.updateUserInfo = async (req, res) => {
  req.body['updatedAt'] = Date.now();

  const userInfoUpdated = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select('-password');
  if (!userInfoUpdated) return res.status(404).send('User not found.')

  res.status(200).send(userInfoUpdated);
}


