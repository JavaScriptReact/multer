const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("image", imageSchema);
