const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let userData = {};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/userData", (req, res) => {
  if (Object.keys(userData).length) {
    res.status(200).json({
      msg: userData,
    });
  } else {
    res.status(404).json({
      msg: "No user data found",
    });
  }
});

app.post("/userData", (req, res) => {
  userData = req.body;

  if (userData) {
    res.status(200).json({
      msg: "User data received successfully",
      data: userData,
    });
  } else {
    res.status(400).json({
      msg: "Error Occurred in receiving the user data",
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
