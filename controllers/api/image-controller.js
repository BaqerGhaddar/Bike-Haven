const fs = require('fs');
const { Image } = require('../../models');
const path = require('path');
const glob = require('glob');

const replaceProfile = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    const dbImageData = await Image.update(
      {
        type: req.file.mimetype,
        name: req.session.username,
        data: fs.readFileSync(
          path.join(
            __dirname,
            '/../../public/images/user/uploads/',
            `${req.session.username}-tmp.png`
          )

          // __dirname + '/../../public/images/user/uploads' + req.file.filename
        )
      },
      { where: { user_id: req.session.user_id } }
    );

    //delete any user existing image first

    // options is optional
    glob(
      `**/${path.join(__dirname, '/../../public/images/user/uploads/')}/${
        req.session.username
      }-tmp.*`,
      function (err, files) {
        for (const file of files) {
          // remove file
          console.log('removing file', file);
          fs.unlinkSync(file);
        }
      }
    );
    const imageData = await Image.findOne({
      where: { user_id: req.session.user_id }
    });
    fs.writeFileSync(
      path.join(
        __dirname,
        '/../../public/images/user/',
        `${imageData.name}.png`
      ),
      // __dirname + '/../../public/images/user/tmp/' + image.name,
      imageData.data
    );
    return res.send(`User profile has been replaced.`);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = { replaceProfile };
