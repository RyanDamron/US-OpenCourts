const router = require("express").Router();
const { User } = require("../../models/");

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create({
          username: req.body.username,
          password: req.body.password,
        });
    
        req.session.save(() => {
          req.session.user_id = newUserData.id;
          req.session.username = newUserData.username;  
          req.session.loggedIn = true;
    
          res.json(newUserData);
          res.status(200).json(newUserData);
        });
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    });
  // Login
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: `${req.body.username} is not a valid username` });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  