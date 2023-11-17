const Area = require("../Model/AreaSchema");
const Market = require("../Model/MarketSchema");
const User = require("../Model/Signup");
const { sendResponse } = require("../helper/helper");
const signup = async (req, res) => {
    try {
      const { number, email,name, password, address,businessname,role,area,market,sellerType } = req.body;
      const imageFileNames = req.files?.map((file) => file?.filename);
      console.log(number, email,name, password, address,businessname,role,area,market )
      const existedarea = await Area.findById(area);
      const existingMarket = await Market.findById(market);
      if(!existedarea && sellerType === "proper"){
        res.status(401).send(sendResponse(false, null, "Area Not Found"));
      }
      if(!existingMarket  && sellerType === "proper"){
        res.status(401).send(sendResponse(false, null, "Market Not Found"));
      }

  
      // Create a new user instance or document based on the User model/schema
      const user = new User({
        email,
        name,
        areaDetails: existedarea,
        marketDetails:existingMarket,
        number,
        address,
        password,
        businessname,
        role,
        sellerType,
        images: imageFileNames,
      });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      res.status(500).json({ message: 'Signup failed', error: error.message });
    }
  };




  const updateUserStatus = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await User.findById(productId);
  
      if (!product) {
        return res.status(404).send(sendResponse(false, null, "User not found"));
      }
  
      // Assuming the status can be either "approve" or "reject"
      const newStatus = req.body.status; // Assuming you pass the new status in the request body
  console.log(newStatus,"newStatus")
      if (newStatus !== "approved" && newStatus !== "rejected") {
        return res.status(400).send(sendResponse(false, null, "Invalid status"));
      }
  
      // Update the status
      product.status = newStatus;
      await product.save();
  
      return res.send(
        sendResponse(
          true,
          product,
          `Product status updated successfully to ${newStatus}`
        )
      );
    } catch (error) {
      // Handle errors
      console.error(error);
      return res
        .status(500)
        .send(sendResponse(false, null, "Internal Server Error"));
    }
  };
  const GetAllUsers = async (req, res) => {
    try {
      const action = req.body.action;
  
      const posts = await User.find();
  
      const baseUrl = "http://terakarachi.com/uploads/"; // Replace with your actual base URL
      const postsWithBaseUrl = posts.map((data) => {
        data.images = data.images.map((image) => baseUrl + image);
        return data;
      });
  
      res.json({ users: postsWithBaseUrl });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve approved or reject posts",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    signup,
    updateUserStatus,
    GetAllUsers
  };
  