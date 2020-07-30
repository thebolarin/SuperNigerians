/* eslint-disable consistent-return */
const User = require('../models/user');
const { renderPage } = require('../utils/render-page');


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) return req.flash('error', 'No User found !');

        const data = {
            users
        };

        renderPage(res, 'admin/allUsers', data, 'All Users', '/');
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.deleteUser = (req, res, next) => {

}