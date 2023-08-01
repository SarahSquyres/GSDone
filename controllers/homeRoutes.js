// put code here
const router = require('express').Router();
const { User } = require('../models');
// const withAuth = require('../utils/auth');
//if we add a route to user profile uncommecment withAuth
router.get('/', async (req, res) => {
  const userData = await User.findAll()

  const users = userData.map((user) =>
  user.get({ plain: true })
  );


  // Send the rendered Handlebars.js template back as the response
  res.render('homepage', {
    users, 
  });
});

module.exports = router;
