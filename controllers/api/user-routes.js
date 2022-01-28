const router = require('express').Router();
const { User } = require('../../models');

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

