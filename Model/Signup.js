const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');     
// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // unique: true,
  },
  name: {
    type: String,
  },
  businessname: {
    type: String,
  },
  number: {
    type: String,
  },
  address: {
    type: String,
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
},

areaDetails: {
    // Include the details of the area as a nested object
    type: Object,
},
  market: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Market",
},

marketDetails: {
    // Include the details of the area as a nested object
    type: Object,
},

  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'subadmin', 'user'],
    // default: 'user',
},
status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending',
},
  images: [
    {
      type: String,
    },
  ],
});
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
