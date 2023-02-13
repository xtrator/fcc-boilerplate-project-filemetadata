var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  let name = req.file.originalname;
  let type = req.file.mimetype;
  let size = req.file.size;
  res.json({ name, type, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
