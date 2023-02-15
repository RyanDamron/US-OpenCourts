const router = require("express").Router();
// create new users, sign-in, sign-out
const userRoutes = require("./userRoutes");
// create favorites
const courtRoutes = require("./courtRoutes");

router.use("/user", userRoutes);
router.use("/court", courtRoutes);

module.exports = router;
