const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    verifyToken: { type: String },
    isVerified: { type: Boolean, default: false },
    verifyTokenExpiry: {
      type: Date,
      default: () => Date.now() + 1000 * 60 * 15,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
