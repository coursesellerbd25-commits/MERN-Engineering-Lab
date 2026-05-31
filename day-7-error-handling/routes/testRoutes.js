const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(404);
    throw new Error("Resource not found");
});

module.exports = router;