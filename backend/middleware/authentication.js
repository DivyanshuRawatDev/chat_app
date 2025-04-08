const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({
        message: "Authentication required. Please login.",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({
        message: "Invalid authentication token",
      });
    }

    req.userId = decodedToken.userID;

    next();
  } catch (error) {
    console.log("Error while authenticate : " + error);
  }
};

module.exports = { authenticate };
