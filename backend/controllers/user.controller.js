const { UserModel } = require("../models/User.model");
const { cloudinary } = require("../utils/cloudinary");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ _id: { $ne: req.userId } });

    if (!users) {
      return res.status(400).json({ message: "No user found" });
    }

    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
  }
};

const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert buffer to base64
    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    // Custom filename
    const filename = `${req.userId || "user"}-${Date.now()}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      public_id: `profile-pics/${filename}`,
      resource_type: "auto",
    });

    const user = await UserModel.findOneAndUpdate(
      { _id: req.userId },
      { profilePicture: result.secure_url }
    );

    return res.status(200).json({
      message: "Uploaded to Cloudinary",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    return res.status(500).json({ message: "Upload failed" });
  }
};

module.exports = { getAllUsers, uploadProfilePic };
