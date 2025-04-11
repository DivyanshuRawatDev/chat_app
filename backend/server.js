const express = require("express");
const { connectDB } = require("./database/db");
const http = require("http");
const userAuth = require("./routes/userAuth.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const { authenticate } = require("./middleware/authentication");
const { setupSocket } = require("./socket");
require("dotenv").config();
const app = express();

const server = http.createServer(app);

//Middlewares
app.use(cookieParser());
app.use(express.json());

//Auth APIs
app.use("/api/auth", userAuth);

//auth middleware
app.use(authenticate);

app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);

//App APIs
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Server connection :-
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });

    setupSocket(server);
  })
  .catch((error) => console.log(error));
