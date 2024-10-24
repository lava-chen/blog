const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  summary: String,
  date: Date,
  likes: Number,
  etitle: String,
  blogcontent: String,
});

module.exports = mongoose.model("Blog", blogSchema);
