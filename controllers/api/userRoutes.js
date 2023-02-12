const router = require("express").Router();
const { User } = require("../../models");

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

    // req.session.save(() => {
    //   req.session.user_id = newUserData.id;
    //   req.session.username = newUserData.username;
    //   req.session.firstname = newUserData.firstname;
    //   req.session.lastname = newUserData.lastname;
    //   req.session.email = newUserData.email;
    //   req.session.logged_in = true;

    //   // res.json(newUserData);
    //   res.status(200).json(newUserData);
    // });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// Login
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
