/*****************************
 *                           *
 *   Bookmarks Controllers   *
 *                           *
 *************************** */

const express = require("express");
const router = express.Router();

//=============================
//  Model
//=============================

const Bookmarks = require("../models/bookmark.js");

//======================
//         Read
//======================
router.get("/", (req, res) => {
  Bookmarks.find({}, (err, foundBookmark) => {
    res.json(foundBookmark);
  });
});

//======================
//       Create
//======================
router.post("/", (req, res) => {
  Bookmarks.create(req.body, (err, createBookmark) => {
    res.json(createBookmark); //.json() will send proper headers in response so client knows it's json coming back
  });
});

//======================
//       Update
//======================
router.put("/:id", (req, res) => {
  Bookmarks.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, updateBookmark) => {
      res.json(updateBookmark);
    }
  );
});

//======================
//       Delete
//======================
router.delete("/:id", (req, res) => {
  Bookmarks.findByIdAndRemove(req.params.id, (err, deletedBookmark) => {
    res.json(deletedBookmark);
  });
});

module.exports = router;
