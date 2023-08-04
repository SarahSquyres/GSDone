//login logout and create new user (sign up stuff)

const router = require("express").Router();
const { User, Task, List } = require("../../models");

//create new user with username, password,  first name, last name, bio, and profile picture
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      user_name: req.body.user_name,
        validate: {
          len: [6],
          unique: true,
            args: true,
            msg: "Username already exists",
        },
      password: req.body.password,
        //check for password length and if it is less than 6 characters, throw an error
        validate: {
          len: [6],
            args: true,
            msg: "Password must be at least 6 characters",
        },
        validate: {
          isAlphanumeric: true,
            args: true,
            msg: "Password must be alphanumeric",
        },


      first_name: req.body.first_name,
      last_name: req.body.last_name,
      bio: req.body.bio,
      profile_picture: req.body.profile_picture,
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
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { user_name: req.body.enteredUsername},
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.enteredPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//route to render user data, task data ,and list data
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: List }, { model: Task }],
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


//find a user by id and add first name, last name, bio, and profile picture
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        bio: req.body.bio,
        profile_picture: req.body.profile_picture,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users- type in http://localhost:3001/api/users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: List }, { model: Task }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a user by id and all associated tasks and lists by typing in http://localhost:3001/api/users/(id number)
router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a single user information by id by typing in http://localhost:3001/api/users/(id number)
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(
      {
        user_name: req.body.user_name,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        bio: req.body.bio,
        profile_picture: req.body.profile_picture,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router;
