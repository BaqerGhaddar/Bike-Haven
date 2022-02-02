const router = require('express').Router();
const { Part, SubPart } = require('../../models');

// get all parts with associated comments
router.get('/', (req, res) => {
  Part.findAll({
    attributes: ['id', 'type'],
    include: [
      {
        model: SubPart,
        attributes: ['id', 'part_id', 'name', 'stock', 'price', 'quality_type']
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
    attributes: ['id', 'type'],
    include: [
      {
        model: SubPart,
        attributes: ['id', 'part_id', 'name', 'stock', 'price', 'quality_type']
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
