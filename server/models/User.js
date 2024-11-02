const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Model
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
    maxlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  occupation: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  likedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  
});

// Hash user password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it is new or has been modified
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    try {
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
      return next(error); // Pass the error to the next middleware in case of failure
    }
  }
  next(); // Proceed with the save operation
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;






