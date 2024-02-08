const express = require("express");
const router = express.Router();

const ImagesController = require("../controllers/images");

router.post("/", ImagesController.uploadImage);

module.exports = router;
