const router = require("express").Router();
const { Courts } = require("../../models");
const withAuth = require("../../utils/auth");

/*******DO NOT forget to add withAuth back in once ready */
router.post("/", async (req, res) => {
  try {
    const newPost = await Courts.findAll({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
