const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
const server = require("http").createServer(app);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

const mongodb_uri = require("./config").mongodb_uri;
mongoose
  .connect(mongodb_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected..."));

const imageSchema = require("./models/images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "build/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("avatar"), function (req, res) {
  const newImage = new imageSchema({
    id: require("crypto").randomBytes(20).toString("hex"),
    path: `uploads/${req.file.filename}`,
  });

  newImage
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => res.status(400).send(result));
});

app.get("/images", function (req, res) {
  imageSchema
    .find({})
    .then((result) => res.send(result))
    .catch((error) => res.status(400).send(error));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = require("./config").PORT;
server.listen(PORT, () => console.log("Server is listening on PORT ", PORT));
