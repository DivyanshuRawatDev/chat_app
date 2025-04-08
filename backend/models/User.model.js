const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyToken: { type: String },
    isVerified: { type: Boolean, default: false },
    verifyTokenExpiry: {
      type: Date,
      default: () => Date.now() + 1000 * 60 * 15,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
