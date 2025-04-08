const express = require("express");
const { connectDB } = require("./database/db");
const userAuth = require("./routes/userAuth.routes");
const cookieParser = require("cookie-parser");
const { authenticate } = require("./middleware/authentication");
require("dotenv").config();
const app = express();

//Middlewares
app.use(cookieParser());
app.use(express.json());

//Auth APIs
app.use("/api/auth", userAuth);

//auth middleware
app.use(authenticate);

//App APIs
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Server connection :-
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((error) => console.log(error));
