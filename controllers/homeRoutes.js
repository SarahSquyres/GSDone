// put code here
const router = require('express').Router();
const { User } = require('../models');
// const withAuth = require('../utils/auth');

// routes to get user_name, bio, profile_pic then render tasks
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    const users = userData.map((project) => project.get({ plain: true }));
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// routes to get user_name, bio, profile_pic and posts


module.exports = router;