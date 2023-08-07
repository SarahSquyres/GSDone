const router = require('express').Router();
const { List, User } = require('../../models');
// const { Task, List, User } = require('../../models');
const withAuth = require('../../utils/auth');

//get all lists works. 
router.get('/', async (req, res) => {
    try {
        const listData = await List.findAll()

        res.status(200).json(listData);
    } catch (err) {
        res.status(500).json({ message: "SadFace, listData not found" });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const listData = await List.findByPk(req.params.id)
  
      if (!listData) {
        res.status(404).json({ message: 'No list found with this id' });
        return;
      }
  
      res.status(200).json(listData);
    } catch (err) {
      res.status(500).json({ message: 'Unable to find list' });
    }
  });

  router.get('/users/:id',  async (req, res) => {
    try {
      const listData = await List.findAll({
          where : { user_id : req.params.id },
        });
  
      if (!listData) {
        res.status(404).json({ message: 'OH NO! No list found with this id' });
        return;
      }
  
      res.status(200).json(listData);
    } catch (err) {
      res.status(500).json({ message: 'sadFace, unable to find list' });
    }
  });

// router.post('/', withAuth, async (req, res) => {
router.post('/', async (req, res) => {
    console.log("Checking what we will send to database")
    console.log(req.body);
    console.log(req.session.user_id)
    try {
        const listData = await List.create({
            list_name: req.body.list_name,

            list_body:req.body.list_body,
            user_id: req.body.user_id,

        });

        //   req.session.save(() => {
        //     req.session.user_id = userData.id;
        //     req.session.logged_in = true;

        //     res.status(200).json(listData);
        //   });

        res.status(200).json(listData);
    } catch (err) {
        res.status(400).json({ message: "SadFace, unable to create new list because " + err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const listData = await List.update(
            {
                list_name: req.body.list_name,
                list_body:req.body.list_body,
                user_id: req.body.user_id,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!listData) {
            res.status(404).json({ message: 'No list found with this id!' });
            return;
        }
        res.status(200).json({ message: "happyFace, list updated!!!" });
    } catch (err) {
        res.status(500).json({ message: "SadFace, unable to update list" });
    }
});

//   router.delete('/:id', withAuth, async (req, res) => {
router.delete('/:id', async (req, res) => {
    try {
        const listData = await List.destroy({
            where: {
                id: req.params.id,
                //   user_id: req.session.user_id,
            },
        });

        if (!listData) {
            res.status(404).json({ message: 'No list found with this id!' });
            return;
        }

        res.status(200).json({ message: "happyFace, list deleted!!!" });
    } catch (err) {
        res.status(500).json({ message: "SadFace, unable to delete list" });
    }
});

module.exports = router;