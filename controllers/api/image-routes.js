const router = require('express').Router();
const uploadController = require('./image-controller');
const upload = require('../../utils/upload');

router.post('/', upload.single('file'), uploadController.replaceProfile);

router.get('/', (req, res) => {
  res.send('hey, testing');
  console.log('GET ROUTE FOR IMAGE');
});

module.exports = router;
