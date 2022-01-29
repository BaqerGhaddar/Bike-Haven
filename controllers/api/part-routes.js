const router = require('express').Router();
const { Part, Part_Comment, User } = require('../../models');

// get all parts with associated comments
router.get('/', (req, res) => {
  Part.findAll({
    attributes: ['id', 'type', 'stock', 'price'],
    include: [
      {
        model: Part_Comment,
        attributes: ['id', 'comment_text', 'part_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all parts by id with associated comments
router.get('/:id', (req, res) => {
  Part.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'type', 'stock', 'price'],
    include: [
      {
        model: Part_Comment,
        attributes: ['id', 'comment_text', 'part_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
