const mongoose = require('mongoose');
const Artwork = require('../models/Artwork.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  Artwork.find()
    .then(artworks => {
      res.render('artwork/list', { artworks })
    })
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Artwork.findById(req.params.id)
    .then(artwork => {
      if (artwork) {
        res.render('artwork/detail', { artwork });
      } else {
        next(createError(404, 'Artwork not found'));
      }
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {
  res.render('artwork/form');
}

module.exports.doCreate = (req, res, next) => {
  const renderWithErrors = (errors) => {
    res.render('artwork/form', {
      artwork: req.body,
      errors
    })
  }

  const data = {
    ...req.body,
    owner: req.user ? req.user._id : undefined
  }

  Artwork.create(data)
    .then(artwork => {
      res.redirect(`/artworks/${artwork._id}`)
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors);
      } else {
        next(err);
      }
    })
}