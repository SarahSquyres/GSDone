const router = require("express").Router();
const { User, List } = require("../../models");

//create new user with username, password,  first name, last name, bio, and profile picture
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      userUsername: req.body.userUsername,
        validate: {
          len: [6],
          unique: true,
            args: true,
            msg: "Username already exists",
        },
        userPassword: req.body.userPassword,
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

      firstName: req.body.firstName,
      lastName: req.body.lastName,
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
    const userData = await User.findOne({where: { userUsername: req.body.userUsername} });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.userPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData.userUsername, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
    alert("Error occurred")
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

//route to render profile and list data

// router.get("/:id", async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id, {
//       include: [{ model: List }] 
//     });
//     const user = userData.get({ plain: true });
//     res.render("profile", {
//       ...user,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


//find a user by id and update info
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
    res.status(200).json({ message: "YAY! User data updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});


//delete user in DB by ID using insomnia 
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

// //DUPLICATE update a single user information by id by typing in http://localhost:3001/api/users/(id number)
// router.put("/:id", async (req, res) => {
//   try {
//     const userData = await User.update(
//       {
//         userUsername: req.body.userUsername,
//         userPassword: req.body.userPassword,
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         bio: req.body.bio,
//         profile_picture: req.body.profile_picture,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     if (!userData) {
//       res.status(404).json({ message: "No user found with this id!" });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//for insomnia to get user info
// router.get("/", async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       include: [{ model: List }],
//     });
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;