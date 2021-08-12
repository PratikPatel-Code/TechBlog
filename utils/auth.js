// Makes it so if user isn't logged in, it will redirect them to the login page
// Took this from class activity

const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
