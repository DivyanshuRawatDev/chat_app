const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/nodemailer");
const randomToken = require("random-token");
const { admin } = require("../utils/firebase-admin");

// useable functions :-
async function sendWelcomeMail(email, name, token) {
  const html = `
    <h2>Hello ${name} 👋</h2>
    <p>Thanks for signing up!</p>
    <p>Click the button below to verify your email</p>
    <a href="http://localhost:5000/api/auth/verify/${token}">Verify Email</a>
  `;

  await sendEmail(email, "Verify your email!", html);
}

// controllers :-
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res
          .status(400)
          .json({ message: "User already exists and is verified." });
      }

      const isTokenExpired = user.verifyTokenExpiry < Date.now();

      if (isTokenExpired) {
        const newToken = randomToken(16);
        user.verifyToken = newToken;
        user.verifyTokenExpiry = Date.now() + 1000 * 60 * 15;
        await user.save();

        await sendWelcomeMail(email, name, newToken);
        return res
          .status(200)
          .json({ message: "Token expired. New verification email sent!" });
      }

      return res
        .status(400)
        .json({ message: "User already exists. Please verify your email." });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    let token = randomToken(16);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      verifyToken: token,
      verifyTokenExpiry: Date.now() + 1000 * 60 * 15,
    });

    await newUser.save();

    sendWelcomeMail(email, name, token);

    return res
      .status(201)
      .json({ message: "Signup successful. Verification mail sent!" });
  } catch (error) {
    console.log("Error while singup : " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not exists! Signup first" });
    }

    if (user?.isVerified == false) {
      return res.status(400).json({ message: "Verify email first" });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "wrong credentials" });
    }

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userWithoutPassword } = user._doc;

    return res
      .status(200)
      .json({ message: "Login successfully", user: userWithoutPassword });
  } catch (error) {
    console.log("Error while login : " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await UserModel.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired." });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
    return res.send({ message: "Email verified successfully!" });
  } catch (error) {
    console.log(error);
  }
};

const verifyFirebaseUser = async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);

    if (!decoded) {
      return res.status().json({ message: "Invalid token" });
    }
    const { uid, email, name, picture } = decoded;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        email,
        name,
        profilePicture: picture,
        isVerified: true,
        password:"12345678"
      });
    }

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "User logged in", data: user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signup, login, verifyToken, verifyFirebaseUser };
