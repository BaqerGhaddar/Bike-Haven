const router = require('express').Router();

const bikeRoutes = require('./bike-routes');
const bikeCommentRoutes = require('./bike-comment-routes');
const PartCommentRoutes = require('./part-comments-routes');
const userRoutes = require('./user-routes');

router.use('/bikes', bikeRoutes);
router.use('/bikeComments', bikeCommentRoutes);
router.use('/partComments', PartCommentRoutes);
router.use('/users', userRoutes);

module.exports = router;
