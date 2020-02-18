// for protecting routes for inAuth users
module.exports = function (req, res, next) {
    if (!req.session.isAuthenticated) {
       return res.redirect('/auth/login');
    }

    next();
};