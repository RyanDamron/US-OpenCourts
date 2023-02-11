const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  // Pass serialized data and session flag into template
  res.render("homepage");
  return;
});

// SIGN UP
router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    // res.redirect('/homepage')
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

router.get("/search", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  // Pass serialized data and session flag into template
  res.render("searchpage");
  return;
});

module.exports = router;
