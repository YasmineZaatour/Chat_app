const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { userSchema } = require("./schema");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const messages = [];
const uri =
  "mongodb+srv://messaging_app:yassou12@cluster0.f6niarb.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}
connect();
/*app.listen(8000, () => {
  console.log("Listening on port 8000");
});*/
// Define a user schema for MongoDB

// Define a User model using the user schema
const User = mongoose.model("User", userSchema);

// Define a route to handle user registration form submission
app.post("/register", (req, res) => {
  // Create a new user object from the submitted form data
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  // Save the new user to the database
  newUser.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error creating new user");
    } else {
      res.status(200).send("User created successfully");
    }
  });
});

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for new messages from the client
  socket.on("chat-message", (data) => {
    const message = {
      pseudonym: data.pseudonym,
      message: data.message,
      timestamp: new Date().toISOString(),
    };

    // Add the message to the messages array
    messages.push(message);

    // Broadcast the message to all other clients
    socket.broadcast.emit("new-message", message);
  });

  // Send the list of previous messages to the client
  socket.emit("previous-messages", messages);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(3000, () => {
  console.log("Listening on port 3000");
});
