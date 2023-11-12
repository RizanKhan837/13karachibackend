const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload  = multer()

//Controller Import
const { signup, updateUserStatus, GetAllUsers } = require("../Conntroller/Signup");
const { login } = require("../Conntroller/Login");
const {
  AddProduct,
  FindbyId,
  ApprovePost,
  GetAllApprovedPost,
  GetAllApprovedPostAdmin,
  GetAllProducts,
  Findbylink,
  DeleteProduct,
  updateProduct,
  findPostsByCategory,
  fndPostsByCategory,
  GetUserProducts,
} = require("../Conntroller/Product");
const {
  placeOrder,
  approveRejectOrder,
  GetAllOrders,
} = require("../Conntroller/Orders");
// const {ApprovePost} = require("../Conntroller/Product")
// const {GetAllApprovedPost} = require("../Conntroller/Product")

// MiddelWare Import
const {
  verifyAdminToken,
  verifySubadminToken,
  verifyUserToken,
  verifySupandadminToken,
} = require("../MiddelWare/TokenVaerification");
const { upload2 } = require("../MiddelWare/Multer");
// const {uploadvideo} = require("../MiddelWare/VideosMulter")

// stripe
const { processPayment, confirmPayment } = require("../Conntroller/Strippe");
const {
  AddCategory,
  GetCategories,
  Findbylinkcat,
  updateCategories,
  DeleteCategory,
} = require("../Conntroller/Category");
const {
  AddBrand,
  GetBrand,
  Findbylinkbrand,
  updateBrand,
  deleteBrand,
} = require("../Conntroller/Brand");
const reviewController = require("../Conntroller/Review");
const {
  AddsubCategory,
  GetsubCategories,
  updatesubCategories,
  deletesubCategories,
} = require("../Conntroller/SubCategory");
const { AddArea, GetArea, updateAreas, DeleteArea } = require("../Conntroller/Area");
const { GetMarket, AddMarket, deleteMarket, updateMarkets } = require("../Conntroller/Market");
// Signup route
// router.post('/signup', upload.none(),signup);
router.post("/signup",upload2,signup);
router.put("/updateUserStatus/:id",upload.none(),updateUserStatus);
router.post("/login" ,upload.none(), login);
router.post("/addProduct", upload2,verifySupandadminToken, AddProduct);

router.put('/posts/:postId',upload.none(), ApprovePost);
// router.post('/GetAllApprovedPostAdmin',verifyAdminToken, GetAllApprovedPostAdmin);

router.get("/product/:Findbylink", Findbylink);
router.get("/category/:Findbylink", Findbylinkcat);
router.get("/brand/:Findbylink", Findbylinkbrand);
router.get("/GetAllProducts", GetAllProducts);
router.get("/GetAllUsers", GetAllUsers);
router.get("/findPostsByCategory/:name", upload2, fndPostsByCategory);
router.get("/GetAllOrders", GetAllOrders);
router.get("/getBrand", GetBrand);
router.get("/getCategories", upload2, GetCategories);
router.get("/getArea", upload2, GetArea);
router.get("/getsubCategories", upload2, GetsubCategories);
router.get("/getMarket", GetMarket);
router.get("/FindbyId/:name", FindbyId);
router.get("/findPostsByCategory/:name", upload2, findPostsByCategory);
router.get("/getUserProducts",verifySubadminToken, GetUserProducts);
router.get("/getAllReview/:ProductId", reviewController.getReviewsByProductId);

router.post("/addCategory", upload2, AddCategory);
router.post("/addArea", upload2, AddArea);
router.post("/addBrand", upload2, AddBrand);
// router.get('/GetAllApprovedPost', GetAllApprovedPost);
router.post("/Checkout", upload2, placeOrder);
router.post("/approveRejectOrder", verifyAdminToken, approveRejectOrder);
router.post("/processPayment", verifyUserToken, processPayment);
router.post("/confirmPayment", verifyUserToken, confirmPayment);
// router.post("/addsubCategory", verifyUserToken, confirmPayment);
router.post("/addsubCategory", upload2, AddsubCategory);
router.post("/addMarket", upload2, AddMarket);

router.post("/createreview", upload2, reviewController.createReview);

router.put(
  "/updatereview/:reviewId",
  upload2,
  reviewController.ApproveandRejectReview
);
router.put("/updateProduct/:productId", upload2, updateProduct);
router.put("/updateBrand/:brandId", upload2, updateBrand);
router.put(
  "/updatesubCategories/:subCategoriesId",
  upload2,
  updatesubCategories
);
router.put("/updateCategory/:CategoriesId", upload2, updateCategories);
router.put("/updateArea/:areaId", upload2, updateAreas);
router.put("/updateMarket/:id", upload2, updateMarkets);



router.delete("/deleteReview/:reviewId", reviewController.deleteReview);
router.delete("/deleteProduct/:productId", DeleteProduct);
router.delete("/deleteCategory/:categoryId", DeleteCategory);
router.delete("/deleteArea/:areaId", DeleteArea);
router.delete("/deleteBrand/:brandId", deleteBrand);
router.delete("/deletesubCategories/:subCategoriesId", deletesubCategories);
router.delete("/deleteMarket/:marketId", deleteMarket);

module.exports = router;
