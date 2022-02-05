const router = require('express').Router();
const withAuth = require('../utils/auth');
const getUser = require('../utils/getUser');
const { Bicycle, Bicycle_Comment, User } = require('../models');
const { resizeArray } = require('../utils/arrays');

// middleware auth function
router.use(withAuth);
router.use(getUser);

router.get('/', async (req, res) => {
  try {
    const dbBikeData = await Bicycle.findAll({
      order: [['brand', 'DESC']],
      limit: 3,
      raw: true,
      nest: true
    });
    featured_bikes = resizeArray(dbBikeData, 3);

    res.render('homepage', {
      current_user: req.current_user,
      featured_bikes,
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
    res.render('bike-products', {
      bikeData,
      loggedIn: req.session.loggedIn,
      current_user: req.current_user
    });
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
    res.render('single-bike', {
      bike,
      loggedIn: req.session.loggedIn,
      current_user: req.current_user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/wishlist', async (req, res) => {
  res.render('wishlist', {
    wishlist: req.session.wishlist,
    loggedIn: req.session.loggedIn,
    current_user: req.current_user
  });
});

router.get('/customize', async (req, res) => {
  res.render('customize', {
    loggedIn: req.session.loggedIn,
    current_user: req.current_user
  });
});

router.get('/home',(req, res) => {
  res.render('home');
});

module.exports = router;
