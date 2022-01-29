const router = require("express").Router();
const userRoutes = require("./user");
const googleUserRoutes = require("./googleUser");

router.use("/user", userRoutes);
router.use("/google", googleUserRoutes);

module.exports = router;