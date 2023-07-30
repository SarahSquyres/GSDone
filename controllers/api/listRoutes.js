const router = require('express').Router();
const { Task, List } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const listData = await List.findAll({
      include: [{ model: Task }]
    });
        res.status(200).json(listData);
    } catch (err) {
        res.status(500).json({ message: "SadFace, listData not found" });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const listData = await List.findByPk(req.params.id, {
        include: [{ model: Task }]
      });
  
      if (!listData) {
        res.status(404).json({ message: 'No list found with this id' });
        return;
      }
  
      res.status(200).json(listData);
    } catch (err) {
      res.status(500).json({ message: 'Unable to find list' });
    }
  });

// router.post('/', withAuth, async (req, res) => {
router.post('/', async (req, res) => {
    try {
        const listData = await List.create({
            list_name: req.body.list_name,
        });

        //   req.session.save(() => {
        //     req.session.user_id = userData.id;
        //     req.session.logged_in = true;

        //     res.status(200).json(listData);
        //   });

        res.status(200).json(listData);
    } catch (err) {
        res.status(400).json({ message: "SadFace, unable to create new list" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const listData = await List.update(
            {
                list_name: req.body.list_name,
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