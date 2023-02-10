const router = require('express').Router();


// SIGN UP
router.get('/signup', async(req,res)=>{
  if (req.session.logged_in){
    // res.redirect('/homepage')
    return;
  }
    // Pass serialized data and session flag into template
    res.render("signup")
    return;
    } 
);

// LOG IN
router.get('/login', async(req,res)=>{
    if (req.session.logged_in){
    //   res.redirect('/homepage')
      return;
    }
      // Pass serialized data and session flag into template
      res.render("login")
      return;
      } 
  );
    module.exports = router;







