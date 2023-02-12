const router = require("express").Router();
const { User, Courts, Favorites } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  // Pass serialized data and session flag into template
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

// LOG IN
router.get("/result", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  // Pass serialized data and session flag into template
  res.render("resultpage");
  return;
});

// router.get("/search", async (req, res) => {
//   if (!req.session.logged_in) {
//     res.redirect("/login");
//     return;
//   }
//   // Pass serialized data and session flag into template
//   res.render("searchpage");
//   return;
// });

// GET all search for Result Page
router.get("/search", async (req, res) => {
  try {
    const searchCourtsData = await User.findAll({
      include: [{ model: Courts, through: Favorites, as: "favorite_courts" }],
    });
    // serialize the data
    const court = searchCourtsData.map((courts) => courts.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("searchpage", { court });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Get all favorite
// find favorite court by its `id` value
// be sure to include its associated court
router.get("/search", async (req, res) => {
  try {
    const searchFavCourtsData = await Courts.findAll({
      include: [{ model: User, through: Favorites, as: "users_favorited" }],
    });
    // serialize the data
    const favorite = searchFavCourtsData.map((favorites) =>
      favorites.get({ plain: true })
    );
    // Pass serialized data and session flag into template
    res.render("searchpage", { favorite });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
