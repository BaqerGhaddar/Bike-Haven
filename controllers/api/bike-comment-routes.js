const router = require('express').Router();
const { Bicycle_Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', (req, res) => {
  Bicycle_Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// post a comment
router.post('/', withAuth, (req, res) => {
  Bicycle_Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id, // change to session later
    bike_id: req.body.bike_id
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
// delete a comment
router.delete('/:id', withAuth, (req, res) => {
  Bicycle_Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
