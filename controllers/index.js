const {
  renderPage
} = require('../utils/render-page');

const home = (req, res) => {
  const data = {
    message: 'This is a General Home Page',
    firstName: 'John',
    lastName: 'Doe',
    pageName: 'Home',
  };

  return renderPage(res, 'pages/adminDashboard', data, 'Demo Page');
};

const profile = (req, res) => {

  const user = req.session.user;
  const userPosts = []
  console.log(user)

  return renderPage(res, 'pages/userDashboard', {
    user,
    userPosts
  }, 'Demo Page', '/profile');
};



module.exports = {
  home,
  profile
};