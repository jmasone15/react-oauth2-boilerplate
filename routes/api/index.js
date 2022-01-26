const router = require("express").Router();
const userRoutes = require("./user");

// add more API routes here once more files have been created
// all routes are exported from this file
router.use("/user", userRoutes);

module.exports = router;