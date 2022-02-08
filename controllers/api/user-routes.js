const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { User, Image } = require('../../models');
const { ValidationError } = require('sequelize');

// get all users
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: req.params.id }
    });
    !dbUserData
      ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/email', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: { email: req.body.email }
    });
    dbUserData
      ? res.status(409).json({ statusText: 'User already exists' })
      : res.status(200).json({ message: 'Email not used' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new user
router.post('/', async (req, res) => {
  /* Request body:
    {   username: 'someuser'
        password: 'somepassword'
        email: 'some@email.com'
    }  */
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    });

    console.log('creating user image with id:', dbUserData.id);
    const dbImageData = await Image.create({
      user_id: dbUserData.id,
      type: 'image/png',
      name: dbUserData.username,
      data: fs.readFileSync(
        path.join(__dirname, '/../../public/images/user/tmp/tmp.png')
        // __dirname + '/../../public/images/user/uploads' + req.file.filename
      )
    });

    fs.writeFileSync(
      path.join(
        __dirname,
        '/../../public/images/user/',
        `${dbImageData.name}.png`
      ),
      // __dirname + '/../../public/images/user/tmp/' + image.name,
      dbImageData.data
    );

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.name = dbUserData.name;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;
      req.session.wishlist = {};
      req.session.wishlist.bikes = [];
      req.session.wishlist.parts = [];
      res.json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ValidationError) {
      res.status(500).json(err);
    }
  }
});

// Check user login
router.post('/login', async (req, res) => {
  const dbUserData = await User.findOne({
    where: { username: req.body.username }
  });

  if (!dbUserData) {
    res.status(400).json({ message: 'No username found!' });
    return;
  }
  const validPassword = dbUserData.checkPassword(req.body.password);
  if (!validPassword) {
    res.status(400).json({ message: 'Incorrect Password' });
    return;
  }
  req.session.save(() => {
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    res.json({ user: dbUserData, message: 'You are now logged in' });
  });
});

router.post('/login/check', async (req, res) => {
  if (!req.session.loggedIn) return;
  const dbUserData = await User.findOne({
    where: { id: req.session.user_id }
  });
  if (!dbUserData) {
    res.status(400).json({ message: 'No username found!' });
    return;
  }
  const validPassword = dbUserData.checkPassword(req.body.password);

  validPassword
    ? res.status(200).json({ message: 'success', result: true })
    : res.status(200).json({ message: 'Incorrect Password', result: false });
});

//Update User
router.put('/', async (req, res) => {
  /* Request body:
    {   username: 'someuser'
        password: 'somepassword'
        email: 'some@email.com'
    }  */
  try {
    const dbUserData = await User.update(
      {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      },
      {
        individualHooks: true,
        where: { id: req.session.user_id },
        raw: true,
        nest: true
      }
    );
    //rename photo
    fs.renameSync(
      path.join(
        __dirname,
        '/../../public/images/user/',
        `${req.body.old_username}.png`
      ),
      path.join(
        __dirname,
        '/../../public/images/user/',
        `${req.body.username}.png`
      )
    );

    !dbUserData
      ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// logout user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end(); // 204 no content, success nothing to do
    });
  }
});

module.exports = router;
