const router = require("express").Router();
const { User, Favorites, Courts } = require("../../models");

// FIND ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Courts, through: Favorites, as: "favorite_courts" }],
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const newUserData = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(newUserData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// FIND one user, validate and save user information
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    console.log("hello im loggin");
    if (!userData) {
      res.status(400).json({
        message: `${req.body.username} is not a valid username and passwords`,
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//LOG OUT
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
