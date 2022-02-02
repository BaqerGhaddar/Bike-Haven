const { User } = require('../models');

const getUser =  async (req, res, next) => {
    if (req.session.loggedIn) {
      const current_user = req.session.loggedIn
        ? await User.findOne({
            where: { id: req.session.user_id },
            attributes: ['id','username','email', 'name' ],
            raw: true,
            nest: true
          })
        : {};
      req.current_user = current_user;
    }
    next();
  };

module.exports = getUser;
