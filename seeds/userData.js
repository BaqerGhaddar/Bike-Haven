const { User, Image } = require('../models');
const fs = require('fs');
const path = require('path');

const userData = [
  {
    username: 'vlad',
    name: 'vlad',
    email: 'vlad@gmail.com',
    password: 'password123'
  },
  {
    username: 'Phil Master',
    name: 'phil',
    email: 'phil@gmail.com',
    password: 'password123'
  }
];
const seedUser = async () => {
  //User.bulkCreate(userData);

  for (user of userData) {
    const dbUserData = await User.create({
      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name
    });

    console.log('creating user image with id:', dbUserData.id);
    const dbImageData = await Image.create({
      user_id: dbUserData.id,
      type: 'image/png',
      name: dbUserData.username,
      data: fs.readFileSync(
        path.join(__dirname, '/../public/images/user/tmp/tmp.png')
        // __dirname + '/../../public/images/user/uploads' + req.file.filename
      )
    });

    fs.writeFileSync(
      path.join(
        __dirname,
        '/../public/images/user/',
        `${dbImageData.name}.png`
      ),
      // __dirname + '/../../public/images/user/tmp/' + image.name,
      dbImageData.data
    );
  }
};

module.exports = seedUser;
