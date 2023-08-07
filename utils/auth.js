// put code here for authentication
const withAuth = (req, res, next) => {

  console.log('Req session', req.session);

  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;

