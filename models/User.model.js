const mongoose = require('mongoose');
const { REQUIRED_FIELD, INVALID_FIELD } = require('../errors');

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: string,
      required: [true, REQUIRED_FIELD]
    },
    email: {
      type: string,
      required: [true, REQUIRED_FIELD],
      unique: true,
      match: [EMAIL_PATTERN, INVALID_FIELD]
    },
    avatar: {
      type: string
    },
    password: {
      type: string,
      required: [true, REQUIRED_FIELD],
      match: [PASSWORD_PATTERN, INVALID_FIELD]
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
