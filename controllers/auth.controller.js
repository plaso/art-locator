const User = require('../models/User.model');
const mongoose = require('mongoose');

module.exports.register = (req, res, next) => {
  res.render('auth/register');
};

module.exports.doRegister = (req, res, next) => {
  const { email } = req.body

  const renderWithErrors = (errors) => {
    res.render('auth/register', {
      user: req.body,
      errors
    })
  }

  // Comprobar si ya hay alguno en la bbdd con ese email

  User.findOne({ email })
    .then(user => {
      if (user) {
        renderWithErrors({ email: 'Email already in use' });
      } else {
        return User.create(req.body)
          .then(() => {
            res.redirect('/login')
          })
      }
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors);
      } else {
        next(err)
      }
    })
}