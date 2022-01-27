const router = require('express').Router();
const { Bicycle, Bicycle_Comment, User } = require('../../models');

// get all bikes with associated comments
router.get('/', (req, res) => {
  Bicycle.findAll({
    attributes: ['id', 'brand', 'model', 'description', 'stock', 'price'],
    include: [
      {
        model: Bicycle_Comment,
        attributes: ['id', 'comment_text', 'bike_id', 'user_id'],
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

// get all bikes by id with associated comments
router.get('/:id', (req, res) => {
  Bicycle.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'brand', 'model', 'description', 'stock', 'price'],
    include: [
      {
        model: Bicycle_Comment,
        attributes: ['id', 'comment_text', 'bike_id', 'user_id'],
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
