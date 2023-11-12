const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "name is Required"],
    },
    link: {
      type: String,
      required: [true, "link is Required"],
    },

  images: [
    {
      type: String,
      required: [true, "images are Required"],
    },
  ],
});

const Area = mongoose.model('Area', AreaSchema, 'Area');

module.exports = Area;
