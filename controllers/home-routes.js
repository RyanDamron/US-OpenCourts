const router = require("express").Router();
const { User, Courts, Favorites } = require("../models");
const withAuth = require("../utils/auth");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Homepage
router.get("/", async (req, res) => {
  res.render("homepage");
  return;
});

// SIGN UP
router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }
  // Pass serialized data and session flag into template
  res.render("signuppage");
  return;
});

// LOG IN

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  // Pass serialized data and session flag into template
  res.render("loginpage");
  return;
});

// SEARCH
router.get("/search", withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  // Pass serialized data and session flag into template
  res.render("searchpage");
  return;
});

// GET RESULT
router.get("/result", withAuth, async (req, res) => {
  try {
    const searchCourtsData = await Courts.findAll({
      where: { city: { [Op.like]: `%${req.query.city}%` } },

      include: [{ model: User, through: Favorites, as: "users_favorited" }],
    });
    // serialize the data
    const raw = searchCourtsData.map((courts) => courts.get({ plain: true }));
    // Pass serialized data and session flag into template
    const courts = raw.slice(0, 10);
    res.render("resultpage", { courts });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//FAVORITES
router.get("/favorites", withAuth, async (req, res) => {
  try {
    console.log(req.session);
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Courts, through: Favorites, as: "favorite_courts" }],
    });
    console.log(userData);
    // serialize the data
    const user = userData.get({ plain: true });
    // Pass serialized data and session flag into template
    console.log(user);
    res.render("favoritepage", { courts: user.favorite_courts });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
