const mongoose = require('mongoose');
const { REQUIRED_FIELD } = require('../errors');
const { DISCIPLINES, SIZES } = require('../constants');

const artworkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    discipline: {
      type: String,
      enum: DISCIPLINES,
      required: [true, REQUIRED_FIELD],
    },
    size: {
      type: String,
      enum: SIZES,
      required: [true, REQUIRED_FIELD],
    },
    artist: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    image: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;