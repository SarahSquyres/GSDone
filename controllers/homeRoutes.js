// put code here
const router = require('express').Router();
const { User, List } = require('../models');
// const { User, Task, List } = require('../models');
// const withAuth = require('../utils/auth');


//route to homepage
router.get('/', async (req, res) => {
  const userData = await User.findAll({
    include: [{ model: List }]
    // include: [{ model: Task, List }]
  });
   const users = userData.map((user) =>
    user.get({ plain: true })
  );

  // const taskData = await Task.findAll();

  // const tasks = taskData.map((task) =>
  //   task.get({ plain: true })
  // );
// why no lists?
  const listData = await List.findAll();

  const lists = listData.map((list) =>
    list.get({ plain: true })
  );

  res.render('profile', {
    users, 
    // tasks,
    lists,
  });
});

//route to profile page using auth 
router.get('/profile', async (req, res) => {

  // TODO: Remove redirect and fix the crash that shows json instead
  res.redirect('/');


  try {
   
    const userData = await User.findByPk(req.session.id, {
      attributes: { exclude: ['userPassword'] }
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route to login page 
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//route to feeds page
router.get('/feedpage', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('feedpage');
});
module.exports = router;
