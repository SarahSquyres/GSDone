const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listRoutes = require('./listRoutes');
// const taskRoutes = require('./taskRoutes');
const commentRoutes = require('./commentRoutes');
// const profileRoutes = require('./profileRoutes');


router.use('/users', userRoutes);
router.use('/lists', listRoutes);
// router.use('/tasks', taskRoutes);
router.use('/comments', commentRoutes);
// router.use('/profile', profileRoutes);

module.exports = router;
