const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
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
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  college: {
    type: String,
    required: true
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ProductSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Product', ProductSchema);