const express = require("express");
const cors = require("cors");
const askgroq = require("./generate.js")
const askgroq2 = require("./generateResume.js")
const app = express();
const port = 3000;

app.use(cors()); // Connecting the f-end and b-end
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


// For PortFolio:
app.post("/userData", (req, res) => {
  const formData = req.body;
  console.log(formData);
  askgroq(formData);
  res.status(200).json({
    msg: "User data received successfully",
    data: formData,
  });
});

//For Resume:
app.post("/BuildingResume", (req, res) => {
  const formData = req.body;
  console.log(formData);
  askgroq2(formData);
  res.status(200).json({
    msg: "User data received successfully",
    data: formData,
  });
});

app.get('*', (req, res) => {
  res.status(404).send("404 Not Found!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    msg: "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

