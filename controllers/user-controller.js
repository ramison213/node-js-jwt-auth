const path = require('path');
const { withAsyncHandler } = require('../errors/errorHandlers');
const logger = require('../utils/logger')(path.basename(__filename));

async function register(req, res, next) {

}

async function login(req, res, next) {

}

async function logout(req, res, next) {

}

async function activate(req, res, next) {

}

async function refresh(req, res, next) {

}

async function getUsers(req, res, next) {
    res.json([1,2,3])
}

module.exports = {
    register: withAsyncHandler(register),
    login: withAsyncHandler(login),
    logout: withAsyncHandler(logout),
    activate: withAsyncHandler(activate),
    refresh: withAsyncHandler(refresh),
    getUsers: withAsyncHandler(getUsers),
}