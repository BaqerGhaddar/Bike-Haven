const router = require('express').Router();
const { SubPart } = require('../../models');

// get all parts with associated comments
router.get('/', (req, res) => {
  SubPart.findAll({
    attributes: ['id', 'name', 'price', 'quality_type']
  })
    .then((dbSubPartData) => res.json(dbSubPartData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all parts by id with associated comments
router.get('/:id', (req, res) => {
  SubPart.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'price', 'quality_type']
  })
    .then((dbSubPartData) => {
      if (!dbSubPartData) {
        res.status(404).json({ message: 'No Part found with this id' });
        return;
      }
      res.json(dbSubPartData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
