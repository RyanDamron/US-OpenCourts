const router = require("express").Router();
const { Courts, Favorites, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/favorites", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const createFavorites = await Favorites.create({
      user_id: req.session.user_id,
      court_id: req.body.court_id,
    });

    res.status(200).json(createFavorites);
    console.log(createFavorites);
  } catch (err) {
    res.status(400).json(err);
  }
});

//***************for future develpment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await User.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
