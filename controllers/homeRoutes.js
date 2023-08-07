// put code here
const router = require('express').Router();
const { User, List } = require('../models');
// const { User, Task, List } = require('../models');
const withAuth = require('../utils/auth');


//route to homepage
router.get('/', async (req, res) => {
  const userData = await User.findAll({
    include: [{ model: List }]
    // include: [{ model: Task, List }]
  });
   const users = userData.map((user) =>
    user.get({ plain: true })
  );

  const listData = await List.findAll();

  const lists = listData.map((list) =>
    list.get({ plain: true })
  );

  res.render('login', {
    users, 
    lists,
  });
});

router.get('/profile', async (req, res) => {
  try {
   const userData = await User.findOne(
      {where: {id: req.session.user_id},
      include: [{ model: List }]
    }
   );
   const user = userData.get({ plain: true });
 console.log(user)
   res.render('profile', { user, logged_in: req.session.logged_in });
  } catch (err) {
  //  res.redirect('login');
   console.log(err);
  }
 });


//route to profile page using auth 
// router.get('/profile', async (req, res) => {
// console.log(req.session)
  // TODO: Remove redirect and fix the crash that shows json instead
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }


//   try {
   
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['userPassword'] }
//     });

//     const user = userData.get({ plain: true });
// console.log(...user)
//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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


router.get('/list/:id', async (req, res) => {
  try {
    const projectData = await User.findByPk(req.params.id, {
      include: [
        {
          model: List,
          attributes: ['list_name'],
        },
      ],
    });

    const list = userData.get({ plain: true });

    res.render('list', {
      ...list,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
