<<<<<<< HEAD
// put code here to route to the home page

=======
// put code here
const router = require('express').Router();
const { User } = require('../models');

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
>>>>>>> 18085fe73c81816b0df76329fd739d61fc145d6b
