/*****************************
 *                           *
 *    Bookmark Models        *
 *                           *
 *************************** */

const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  complete: Boolean
});

const Bookmarks = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmarks;

