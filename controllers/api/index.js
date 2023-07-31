const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listRoutes = require('./listRoutes');
const taskRoutes = require('./taskRoutes');
const listRoutes = require('./listRoutes');

router.use('/users', userRoutes);
router.use('/lists', listRoutes);
router.use('/tasks', taskRoutes);
router.use('/lists', listRoutes);

module.exports = router;
