const router = require('express').Router();
const withAuth = require('../utils/auth');

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
    res.render('logout')
  } else {
    res.redirect('/');;
  }
});

module.exports = router;
