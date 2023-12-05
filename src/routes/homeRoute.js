const express = require("express");

const homeController = require("../controller/home-controller");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = express.Router();

router.get("/user", authenticateMiddleware, homeController.profile);
router.patch(
  "/update-profile",
  authenticateMiddleware,
  homeController.updateProfile
);

router.get("/shops", authenticateMiddleware, homeController.getShop);
router.post(
  "/create-banner",
  authenticateMiddleware,
  homeController.createBanner
);
router.delete(
  "/cancel/:shopId",
  authenticateMiddleware,
  homeController.deleteShop
);

module.exports = router;
