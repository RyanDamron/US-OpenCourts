const router = require("express").Router();
const { Courts } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all search for Result Page
// router.get("/searchedresult", async (req, res) => {
//   try {
//     const newCourt = await Courts.findAll({
//       where: { city: {[Op.like]:req.body.city} },
//       // ...req.body,
//       // street: req.session.street,
//       // city: req.session.city,
//       // state: req.session.state,
//       // zip_code: req.session.zip_code,
//     });
//     console.log("searched city found!");

//     if (!newCourt) {
//       res.status(400).json({
//         message: `${req.body.city} is not a valid cityname`,
//       });
//       return;
//     }
//     const newCourtJson = await newCourt.json();
//     console.log(newCourtJson);
//     // req.session.save(() => {
//     //   req.session.city = newCourt.city;
//     //   // req.session.street = newCourt.street;
//     //   // req.session.state = newCourt.state;
//     //   // req.secure.zip_code = req.session.zip_code;

//     // });
//     res.json({ newCourtJson });
//   } catch (err) {
//     res.status(400).json(err);
//   }

// });

/*******DO NOT forget to add withAuth back in once ready */
// router.post("/", async (req, res) => {
//   try {
//     const newPost = await Courts.create({
//       where: { city: req.body.city },
//     });

//     req.session.save(() => {
//       req.session.city = newPost.city;
//       req.session.logged_in = true;

//       res.json({ user: newPost, message: "Searched found!" });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
module.exports = router;
