import mongoose from 'mongoose';

var subscriptionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

});

export default mongoose.model('Subscription', subscriptionSchema);