const router = require("express").Router();
// create new users, sign-in, sign-out
const userRoutes = require("./userRoutes");

router.use("/user", userRoutes);

module.exports = router;
