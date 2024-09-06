const path = require('path');
const { withAsyncHandler } = require('../errors/errorHandlers');
const logger = require('../utils/logger')(path.basename(__filename));
const userService = require('../services/user-service');

async function register(req, res, _next) {
    const { email, password } = req.body;
    const userData = await userService.registration(email, password);
    // TODO change magic const to variable
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

    return res.json(userData);
}

async function login(req, res, next) {

}

async function logout(req, res, next) {

}

async function activate(req, res, next) {
    const activationLink = req.params.link;
    await userService.activate(activationLink);

    return res.redirect(process.env.CLIENT_URL);
}

async function refresh(req, res, next) {

}

async function getUsers(req, res, next) {
}

module.exports = {
    register: withAsyncHandler(register),
    login: withAsyncHandler(login),
    logout: withAsyncHandler(logout),
    activate: withAsyncHandler(activate),
    refresh: withAsyncHandler(refresh),
    getUsers: withAsyncHandler(getUsers),
}