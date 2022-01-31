const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Bicycle, Bicycle_Comment, User } = require('../models');
const resizeArray = require('../utils/resizeArray');

// middleware auth function
router.use(withAuth);

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      page: 'homepage',
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  !req.session.loggedIn
    ? res.render('login', { page: 'homepage', isSignup: req.query.isSignup })
    : res.redirect('/');
});

// logout user
router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end(); // 204 no content, success nothing to do
    });
    res.render('logout');
  } else {
    res.redirect('/');
  }
});

router.get('/bikes', async (req, res) => {
  try {
    const dbBikeData = await Bicycle.findAll({ raw: true, nest: true });
    if (!dbBikeData) return;
    const bikeData = resizeArray(dbBikeData, 3);
    console.log(bikeData);
    res.render('bikes', { bikeData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/bikes/:id', async (req, res) => {
  try {
    const bike = await Bicycle.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Bicycle_Comment,
          include: { model: User, attributes: ['username'] }
        }
      ],
      raw: true,
      nest: true
    });
    if (!bike) {
      res.status(404).json({ message: 'No bike found with this id' });
      return;
    }
    console.log(bike);
    res.render('single-bike', { bike, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
