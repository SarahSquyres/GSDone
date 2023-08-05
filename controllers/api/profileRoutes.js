const router = require("express").Router();
const withAuth = require("../../utils/auth");

//route to display profile user name, bio, profile picture
router.get("/", withAuth,  async (req, res) => {
    try {
        const profileData = await User.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        const profile = profileData.map((profile) =>
            profile.get({ plain: true })
        );
        res.render("profile", {
            layout: "",
            profile,
        });
    } catch (err) {
        res.redirect("login");
    }
});

//route to render user data, task data ,and list data for specific users in a search
// router.get("/:id", withAuth, async (req, res) => {
//     try {
//       const userData = await User.findByPk(req.params.id, {
//         include: [{ model: List }, { model: Task }],
//       });
//       const user = userData.get({ plain: true });
//       res.render("profile", {
//         ...user,
//         logged_in: req.session.logged_in,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//route to update profile- keep
router.put("/:id", withAuth, async (req, res) => {
    try {
        const profileData = await Profile.update(
            {
                where: {
                    user_id: req.session.user_id,
                },
            },
            {   
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                userUsername: req.body.userUsername,
                userPassword: req.body.userPassword,
                bio: req.body.bio,
                profile_picture: req.body.profile_picture,
            },
        );
        if (!profileData) {
            res.redirect('login');
            return;
        }
        res.status(200).json(profileData);
    } catch (err) {
        res.status(500).json(err);
    }
});

    
//route to allow user to delete profile
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const profileData = await Profile.destroy({
            where: {
                user_id: req.session.user_id,
            },
        });
        if (!profileData) {
            res.redirect('login');
        }
        res.status(200).json(profileData);
    } catch (err) {
        res.redirect('login');
    }
});

//route to render user data, task data ,and list data
router.get("/:id", async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [{ model: List }]
          // , { model: Task },
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
  
  //delete user from backend
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

module.exports = router;

