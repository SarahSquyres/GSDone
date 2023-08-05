const router = require('express').Router();
const { User, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
        include: [{ model: User,
        attributes: ['userUsername'] }]
      });

    if (!commentData) {
      res.status(404).json({ message: 'OH NO! No comment found!!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json({ message: 'sadFace, unable to find comment' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
        include: [{ model: User,
        attributes: ['userUsername'] }]
      });

    if (!commentData) {
      res.status(404).json({ message: 'OH NO! No comment found with this id' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json({ message: 'sadFace, unable to find comment' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
        where : { user_id : req.body.user_id },
        include: [{ model: User,
        attributes: ['userUsername'] }]
      });

    if (!commentData) {
      res.status(404).json({ message: 'OH NO! No comment found with this id' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json({ message: 'sadFace, unable to find comment' });
  }
});

// router.post('/', withAuth, async (req, res) => {
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_body: req.body.comment_body,
      user_id: req.body.user_id,
    });

    //   req.session.save(() => {
    //     req.session.user_id = userData.id;
    //     req.session.logged_in = true;

    //     res.status(200).json(listData);
    //   });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json({ message: "sadFace, unable to create new comment" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        comment_body: req.body.comment_body,
        user_id: req.body.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!commentData) {
      res.status(404).json({ message: 'OH NO! No comment found with this id' });
      return;
    }
    res.status(200).json({ message: "happyFace, comment updated!!!" });
  } catch (err) {
    res.status(500).json({ message: "SadFace, unable to update comment" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        //   user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'OH NO! No comment found with this id' });
      return;
    }

    res.status(200).json({ message: "happyFace, comment deleted!!!" });
  } catch (err) {
    res.status(500).json({ message: "SadFace, unable to delete comment" });
  }
});

module.exports = router;