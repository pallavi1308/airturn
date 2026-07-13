const express = require("express");

const authController = require("../controllers/authController");

const {
    authenticate,
    authorize,
  } = require("../../../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/me", authenticate, authController.getCurrentUser);
router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);
module.exports = router;