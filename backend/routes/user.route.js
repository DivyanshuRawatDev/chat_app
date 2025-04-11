const express = require("express");
const {
  getAllUsers,
  uploadProfilePic,
} = require("../controllers/user.controller");
const { upload } = require("../utils/multer");
const router = express.Router();

router.get("/", getAllUsers);
router.post(
  "/upload/profile-pic",
  upload.single("profile-pic"),
  uploadProfilePic
);

module.exports = router;
