
exports.get404 = (req, res, next) => {
  res.status(404).render('pages/error404', {
    pageTitle: 'Page Not Found',
    path: '/404',
    isLoggedIn: req.session.isLoggedIn
  });
};


exports.get500 = (req, res, next) => {
  res.status(500).render('pages/error500', {
    pageTitle: 'Technical Error',
    path: '/500',
    isLoggedIn: req.session.isLoggedIn
  });
};

