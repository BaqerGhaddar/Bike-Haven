const router = require('express').Router();
const { Bicycle, Part } = require('../../models');
const { checkExist } = require('../../utils/arrays');
const getUser = require('../../utils/getUser');

router.use(getUser);

router.get('/', (req, res) => {
  !req.session.loggedIn
    ? res.status(404).json({ message: 'User not found' })
    : res
        .status(200)
        .json({ wishlist: req.session.wishlist, user: req.current_user });
});

router.get('/bikes', (req, res) => {
  !req.session.loggedIn
    ? res.status(404).json({ message: 'User not found' })
    : res
        .status(200)
        .json({ parts: req.session.wishlist.parts, user: req.current_user });
});

router.get('/parts', (req, res) => {
  !req.session.loggedIn
    ? res.status(404).json({ message: 'User not found' })
    : res
        .status(200)
        .json({ bikes: req.session.wishlist.bikes, user: req.current_user });
});

router.post('/bikes/:id', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const dbBikeData = await Bicycle.findOne({
      where: {
        id: req.params.id
      },
      raw: true,
      nest: true
    });

    if (!dbBikeData) {
      res.status(404).json({ message: 'No bike found with this id' });
      return;
    }

    //req.session.save(() => {
    req.session.wishlist.bikes = checkExist(
      req.session.wishlist.bikes,
      dbBikeData
    );

    res.json(dbBikeData);
    //});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/parts/:id', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const dbBikeData = await Part.findOne({
      where: {
        id: req.params.id
      },
      raw: true,
      nest: true
    });

    if (!dbBikeData) {
      res.status(404).json({ message: 'No part found with this id' });
      return;
    }
    //req.session.save(() => {
    req.session.wishlist.parts = checkExist(
      req.session.wishlist.parts,
      dbBikeData
    );
    res.json(dbBikeData);
    //});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/bikes/:id', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    req.session.wishlist.bikes.forEach((item, i) => {
      if (item.id == req.params.id) {
        if (item.quantity == 1) {
          req.session.wishlist.bikes.splice(i, 1);
        } else {
          item.quantity--;
        }
      }
    });

    res.json({ message: 'Bike removed from wishlsit' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/parts/:id', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    req.session.wishlist.parts.forEach((item, i) => {
      if (item.id == req.params.id) {
        if (item.quantity == 1) {
          req.session.wishlist.parts.splice(i, 1);
        } else {
          item.quantity--;
        }
      }
    });

    res.json({ message: 'Part removed from wishlsit' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
