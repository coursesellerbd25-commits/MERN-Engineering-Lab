const express = require("express");
const router = express.Router();
const {registerUser, loginUser, dashboard,} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", protect, dashboard);

module.exports = router;