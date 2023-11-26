const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: [
    {
      type: Object,
      ref: "Category",
    },
  ],
  user: {
    type: Object,
    ref: "users",
  },

  
  // subcategories: [
  //   {
  //     type: String,
  //   },
  // ],

  price: {
    type: String,
  },
  discountedPrice: {
    type: String,
  },
  menuProductNumber: {
    type: Number,
  },
  totalUnits: {
    type: String,
  },
  longDescription: {
    type: String,
    // required: [f, "longDescription is Required"],
  },
  shortDescription: {
    type: String,
  },
  ProductLink: {
    type: String,
  },
  products: [
    {
      size: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      color: {
        type: String,
      },
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  isApproved: {
    type: Boolean,
    default: false,
  },
  // video: {
  //   type: String,
  // },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
