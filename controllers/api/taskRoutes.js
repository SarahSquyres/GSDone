const router = require('express').Router();
const { Task, List } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const taskData = await Task.findAll();
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json({ message: "Tasks not found!" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id);

    if (!taskData) {
      res.status(404).json({ message: 'No task found with this id' });
      return;
    }

    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json({ message: 'Unable to find task' });
  }
});

// router.post('/', withAuth, async (req, res) => {
  router.post('/', async (req, res) => {
    try {
      const taskData = await Task.create({
        task_description: req.body.task_description,
        list_id: req.body.list_id,
      });

        //   req.session.save(() => {
        //     req.session.user_id = userData.id;
        //     req.session.logged_in = true;

        //     res.status(200).json(listData);
        //   });

        res.status(200).json(taskData);
    } catch (err) {
        res.status(400).json({ message: "SadFace, unable to create new task" });
    }
});

router.put('/:id', async (req, res) => {
  try {
      const taskData = await Task.update(
          {
            task_description: req.body.task_description,
            list_id: req.body.list_id,
          },
          {
              where: {
                  id: req.params.id,
              },
          }
      );

      if (!taskData) {
          res.status(404).json({ message: 'No task found with this id!' });
          return;
      }
      res.status(200).json({ message: "happyFace, task updated!!!" });
  } catch (err) {
      res.status(500).json({ message: "SadFace, unable to update task" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
      const taskData = await Task.destroy({
          where: {
              id: req.params.id,
              //   user_id: req.session.user_id,
          },
      });

      if (!taskData) {
          res.status(404).json({ message: 'No task found with this id!' });
          return;
      }

      res.status(200).json({ message: "happyFace, task deleted!!!" });
  } catch (err) {
      res.status(500).json({ message: "SadFace, unable to delete task" });
  }
});

module.exports = router;