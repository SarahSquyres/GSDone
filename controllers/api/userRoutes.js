const router = require('express').Router();
const { User } = require('../../models');

//create new user with username, password,  first name, last name, bio, and profile picture
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      user_name: req.body.user_name,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
//add others if needed
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });
console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      console.log("you are now logged in!");
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//update user info- username, password, first name, last name, bio, and profile picture
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        bio: req.body.bio,
        profile_picture: req.body.profile_picture,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }

});

//delete user
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//testing route that works to display-- delete later
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: "Darn userData not found" });
  }
});

module.exports = router;