const express = require("express");
const router = express.Router();

const ImagesController = require("../controllers/images");

router.post("/profile", ImagesController.uploadProfileImg);

module.exports = router;
