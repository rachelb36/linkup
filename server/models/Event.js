const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const eventSchema = new Schema({
  
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },

  state: {
    type: String,
    required: false,
    MaxLength: 2,
  },
  zip: {
    type: String,
    required: false,
    MaxLength: 5,
  },
  date: {
    type: Date,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: false,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ]
});

const Event = model('Event', eventSchema);

module.exports = Event;
