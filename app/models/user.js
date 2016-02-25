import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import Subscription from './subscription';
import config from '../config';

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: false
  },
  last_name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean
  },
  subscriptions: [Subscription],
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre('save', function(next) {
  let user = this;

  // Only hash password if changed.
  if (!user.isModified('password')) {
    return next();
  }

  // Hash password.
  bcrypt.hash(user.password, config.saltine, function(err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

export default mongoose.model('User', userSchema);