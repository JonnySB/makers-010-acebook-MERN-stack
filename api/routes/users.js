const express = require("express");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/:user_id", tokenChecker, UsersController.getUserById);
router.post("/:user_id/bio", tokenChecker, UsersController.updateBio);
router.post(
  "/:user_id/currentLocation",
  tokenChecker,
  UsersController.updateCurrentLocation
);
router.post(
  "/:user_id/workplace",
  tokenChecker,
  UsersController.updateWorkplace
);
router.post(
  "/:user_id/education",
  tokenChecker,
  UsersController.updateEducation
);

module.exports = router;
