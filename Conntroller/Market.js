const Area = require("../Model/AreaSchema");
const Market = require("../Model/MarketSchema");
const { sendResponse } = require("../helper/helper");
const path = require("path");
const fs = require("fs");

// Subadmin add post route
const AddMarket = async (req, res) => {
    try {
      const { name, area } = req.body;
      const existedarea = await Area.findById(area);
      console.log(area, "area");
      console.log(existedarea, "existedarea");
      if (existedarea) {
        const markets = new Market({
          name,
          area: existedarea._id, // Save only the ID of the area
          areaDetails: existedarea, // Save the whole area object
          images: req.files.map((file) => file.filename),
        });
  
        await markets.save();
        res
          .status(201)
          .json({ message: " Market added successfully", markets: markets });
      } else {
        res.status(401).send(sendResponse(false, null, "Area Not Found"));
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to Category", error: error.message });
    }
  };
  
const GetMarket = async (req, res) => {
  try {
    const market = await Market.find();

    res.json({ market });
  } catch (error) {
    // console.log(req.files, "req.user");
    res.status(500).json({ message: "Failed to Brand", error: error.message });
  }
};
const updateMarkets = async (req, res) => {
    try {
      const { id } = req.params; // Assuming you pass the market ID in the URL
      const { name, area } = req.body;
  
      // Check if the market with the given ID exists
      const existingMarket = await Market.findById(id);
      
      if (existingMarket) {
        // Check if the area ID provided exists
        const existedarea = await Area.findById(area);
  
        if (existedarea) {
          // Remove old images if new images are provided
          if (req.files && req.files.length > 0) {
            existingMarket.images.forEach(async (oldImage) => {
              // Delete old image files from the server
              const imagePath = path.join("uploads/", oldImage);
              await fs.promises.unlink(imagePath);
            });
  
            // Update images with new filenames
            existingMarket.images = req.files.map((file) => file.filename);
          }
  
          // Update market details
          existingMarket.name = name;
          existingMarket.area = existedarea._id;
          existingMarket.areaDetails = existedarea;
  
          // Save the updated market
          await existingMarket.save();
  
          res.status(200).json({
            message: "Market updated successfully",
            market: existingMarket,
          });
        } else {
          res.status(401).send(sendResponse(false, null, "Area Not Found"));
        }
      } else {
        res.status(404).send(sendResponse(false, null, "Market Not Found"));
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update market", error: error.message });
    }
  };
  
  
  
const deleteMarket = async (req, res) => {
  let marketId = req.params.marketId;
  let result = await Market.findById(marketId);

  if (!result) {
    res.send(sendResponse(false, null, "Data Not Found")).status(404);
  } else {
    let deleResult = await Market.findByIdAndDelete(marketId);
    if (!deleResult) {
      res.send(sendResponse(false, null, "Data Not Deleted")).status(400);
    } else {
      res.send(sendResponse(true, deleResult, "Data Deleted")).status(200);
    }
  }
};

module.exports = {
  AddMarket,
  GetMarket,
  updateMarkets,
  deleteMarket,
};
