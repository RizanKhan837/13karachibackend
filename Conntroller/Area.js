const Area = require("../Model/AreaSchema");
const { sendResponse } = require("../helper/helper");
const path = require("path");
const fs = require("fs");

// Subadmin add post route
const AddArea = async (req, res) => {
  try {
    const imageFileNames = req.files.map((file) => file.filename);
    const { name, link } = req.body;
    const post = new Area({
      name,
      link,
      images: imageFileNames,
    });

    await post.save();
    res
      .status(201)
      .json({ status: true, message: "Area added successfully" });
    // });
  } catch (error) {
    // console.log(req.files, "req.user");
    res
      .status(500)
      .json({ message: "Failed to Area", error: error.message });
  }
};
const GetArea = async (req, res) => {
  try {
    const areas = await Area.find();

    res.json({ areas });
  } catch (error) {
    // console.log(req.files, "req.user");
    res.status(500).json({ message: "Failed to get Area", error: error.message });
  }
};

// const Findbylinkcat = async (req, res) => {
//   try {
//     const searchKey = req.params.Findbylink; // URL se search key hasil karen
//     console.log(searchKey, "searchKey");

//     const result = await Category.findOne({ link: searchKey });

//     if (!result) {
//       res
//         .status(404)
//         .json({ message: "ProductLink ke saath koi product nahi mila." });
//       return;
//     }

//     res.status(200).json({ result });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to approve post", error: error.message });
//   }
// };

const updateAreas = async (req, res) => {
  try {
    const AreaId = req.params.areaId;

    const result = await Area.findById(AreaId);

    if (!result) {
      return res.status(404).send(sendResponse(false, null, "Data Not Found"));
    }

    // Handle image updates if there are uploaded files
    if (req.files && req.files.length > 0) {
      const imageFilenames = req.files.map((file) => file.filename);
      req.body.images = imageFilenames;

      if (result.images && result.images.length > 0) {
        // Delete the old images
        result.images.forEach((oldImage) => {
          const imagePath = path.join("uploads/", oldImage);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(`Error deleting old image: ${err}`);
            }
          });
        });
      }
    }

    const update = await Area.findByIdAndUpdate(AreaId, req.body, {
      new: true,
    });

    if (!update) {
      return res.status(404).send(sendResponse(false, null, "Data Not Found"));
    } else {
      return res.status(200).send(sendResponse(true, update, "Data Update"));
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send(sendResponse(false, null, "Internal Error"));
  }
};

const DeleteArea = async (req, res) => {
  let areaId = req.params.areaId;
  let result = await Area.findById(areaId);

  if (!result) {
    res.send(sendResponse(false, null, "Data Not Found")).status(404);
  } else {
    let deleResult = await Area.findByIdAndDelete(areaId);
    if (!deleResult) {
      res.send(sendResponse(false, null, "Data Not Deleted")).status(400);
    } else {
      res.send(sendResponse(true, deleResult, "Data Deleted")).status(200);
    }
  }
};

module.exports = {
  AddArea,
  GetArea,
//   Findbylinkcat,
  updateAreas,
  DeleteArea
};
