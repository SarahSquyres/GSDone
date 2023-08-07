const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listRoutes = require('./listRoutes');
// const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/lists', listRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;