const router = require('express').Router();
const { User, Bicycle, Part, Wishlist } = require('../../models');

// get all users
router.get('/', (req, res) => {
  User.findAll({ attributes: { exclude: ['password'] } })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single user
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Part,
        through: Wishlist
      },
      {
        model: Bicycle,
        through: Wishlist
      }
    ]
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // {
  // "username": "testingUser",
  // "email": "testing@email.com",
  // "password": "pass12345"
  //}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
