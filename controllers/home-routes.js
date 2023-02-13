const router = require("express").Router();
const { User, Courts, Favorites } = require("../models");
const withAuth = require("../utils/auth");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/')
    return;
  }
  // Pass serialized data and session flag into template
  res.render("loginpage")
  return;
}
);

/* redundant code with below*/
//   // LOG IN
// router.get('/result', async(req, res) => {
//   if (!req.session.logged_in){
//       res.redirect('/login')
//     return;
//   }
//     // Pass serialized data and session flag into template
//     res.render("resultpage")

// router.get("/login", async (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect("/");

//     return;
//   }
//   // Pass serialized data and session flag into template
//   res.render("loginpage");
//   return;
// });

// LOG IN
// router.get("/result", async (req, res) => {
//   if (!req.session.logged_in) {
//     res.redirect("/login");
//     return;
//   }
//   // Pass serialized data and session flag into template
//   res.render("resultpage");
//   return;
// });

router.get("/search", withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  // Pass serialized data and session flag into template
  res.render("searchpage");
  return;
});

// GET all search for Result Page
router.get("/result", withAuth, async (req, res) => {
  try {
    const searchCourtsData = await Courts.findAll({
      where: { city: { [Op.like]: `%${req.query.city}%` }, },


      include: [{ model: User, through: Favorites, as: "users_favorited" }],
    });
    // serialize the data
    const raw = searchCourtsData.map((courts) => courts.get({ plain: true }));
    // Pass serialized data and session flag into template
    // console.log(courts);
    const courts = raw.slice(0, 10);

    res.render("resultpage", { courts });
  } catch (err) {
    res.status(400).json(err.message);
  }
});


router.get("/favorites", withAuth, async (req, res) => {
  try {
    console.log(req.session);
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Courts, through: Favorites, as: "favorite_courts" }],
    });
    console.log(userData);
    // serialize the data
    const court = userData.get({ plain: true });
    // Pass serialized data and session flag into template
    res.render("searchpage", { court });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Get all favorite
// find favorite court by its `id` value
// be sure to include its associated court
// router.get("/search", async (req, res) => {
//   try {
//     const searchFavCourtsData = await Courts.findAll({
//       include: [{ model: User, through: Favorites, as: "users_favorited" }],
//     });
//     // serialize the data
//     const favorite = searchFavCourtsData.map((favorites) =>
//       favorites.get({ plain: true })
//     );
//     // Pass serialized data and session flag into template
//     res.render("searchpage", { favorite });
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// });

module.exports = router;
