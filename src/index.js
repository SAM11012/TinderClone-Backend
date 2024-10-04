const express = require("express");
const connectDatabase = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());

app.post("/signUp", async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    console.log(req.body, "the body");
    res.send("user added successfully");
  } catch (err) {
    console.log("the error is -", err);
  }
});
/// addding a feed which will get all the users from the database

app.get("/getUser", async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);
  try {
    const users = await User.find({ email: userEmail });
    console.log(users);
    if (users.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// api to get only one user
app.get("/getOneUser", async (req, res) => {
  const useremail = req.body.email;
  try {
    const user = await User.findOne({ email: useremail });
    res.status(200).send(user);
  } catch (err) {
    res.send(err);
  }
});

// api for showing all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(403).send(err);
  }
});

/// delete and Update Data API's

app.delete("/delete", async (req, res) => {
  const userId = req.body.id;
  console.log(userId);
  try {
    await User.findByIdAndDelete(userId);
    res.send("User Delete Successfully");
  } catch (err) {
    res.status(403).send(err);
  }
});

app.patch("/updateUser", async (req, res) => {
  const userId = req.body.id;

  try {
    await User.findByIdAndUpdate(userId, req.body, { strict: true });
    res.send("User Updated succesfully")
  } catch (err) {
    res.status(403).send(err);
  }
});
connectDatabase()
  .then(() => {
    console.log("connected to database");
    app.listen(7777, () => {
      console.log("app listeming");
    });
  })
  .catch((err) => console.log("this is error", err));
