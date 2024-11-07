const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const { format } = require('date-fns'); // Import date-fns for formatting

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
    maxLength: 2,
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

// Virtual field to format the date
eventSchema.virtual('formattedDate').get(function () {
  return format(this.date, 'MMMM d, yyyy'); // Outputs "January 21, 2025"
});

// Virtual field to format the time
eventSchema.virtual('formattedTime').get(function () {
  const [hours, minutes] = this.time.split(':');
  const hour = parseInt(hours, 10);
  const isPM = hour >= 12;
  const formattedHour = hour % 12 || 12;
  const period = isPM ? 'pm' : 'am';
  return `${formattedHour}:${minutes}${period}`; // Outputs "3:00pm"
});

// Enable virtuals in JSON output
eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

const Event = model('Event', eventSchema);

module.exports = Event;
