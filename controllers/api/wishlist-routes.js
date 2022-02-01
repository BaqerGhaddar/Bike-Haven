const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Wishlist } = require('../../models');
const resizeArray = require('../../utils/resizeArray');

router.get('/', async (req, res) => {
  try {
    const dbWishlistData = await Wishlist.findOne({
      where: {
        user_id: req.session.user_id
      }
    });
    !dbWishlistData
      ? res.status(404).json({ message: 'No Wishlist found with this id' })
      : res.json(dbWishlistData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbWishlistData = await Wishlist.findAll({
      where: {
        user_id: req.params.id
      }
    });
    !dbWishlistData
      ? res.status(404).json({ message: 'No Wishlist found with this id' })
      : res.json(dbWishlistData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const dbWishlistData = await Wishlist.create({
      bike_id: req.body.bike_id,
      user_id: req.body.user_id,
      part_id: req.body.part_id
    });

    !dbWishlistData
      ? res.status(404).json({ message: 'No Wishlist found with this id' })
      : res.json(dbWishlistData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
