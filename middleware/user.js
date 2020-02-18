// для передачи данных от сессии в модель User
const User = require('../models/user');

module.exports = async function (req, res, next) {
    if (!req.session.user) {
        return next();
    }

    req.user = await User.findById(req.session.user._id);
    next();
};