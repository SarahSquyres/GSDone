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
    const taskData = await Task.findByPk(req.params.id, {
      include: [{ model: List }]
    });

    if (!taskData) {
      res.status(404).json({ message: 'No task found with this id' });
      return;
    }

    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json({ message: 'Unable to find task' });
  }
});

module.exports = router;