const router = require("express").Router();
// create new users, sign-in, sign-out
const userRoutes = require("./userRoutes");


const courtRoutes = require("./courtRoutes");

router.use("/user", userRoutes);
router.use("/court", courtRoutes);

module.exports = router;
