const router = require('express').Router();
const { User, List } = require('../models');
// const withAuth = require('../utils/auth');


//route to homepage
router.get('/', async (req, res) => {
  // const userData = await User.findAll({
  //   include: [{ model: List }]
  // });
  //  const users = userData.map((user) =>
  //   user.get({ plain: true })
  // );
  // const listData = await List.findAll();

  // const lists = listData.map((list) =>
  //   list.get({ plain: true })
  // );

  res.render('login');
});

//route to render user data, task data ,and list data for specific users in a search
// possibly change endpoint //add withAuth when fixed
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne(req.params.user_id, {
      include: [{ model: List }],
    });
    const user = userData.get({ plain: true });
    res.render("profile", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// //route to profile page using auth 
router.get('/profile', async (req, res) => {
  try {
    // TODO: Remove redirect and fix the crash that shows json instead

    // const userData = await User.findByPk(req.session.id, {
    //   attributes: { exclude: ['userPassword'] }
    // });

    // const user = userData.get({ plain: true });

    res.render('profile', {
      // ...user,
      // logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route to login page 
//not the fucking problem
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// //route to feeds page
router.get('/feedpage', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('feedpage');
});
module.exports = router;