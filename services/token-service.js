const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token');

function generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES });

    return {
        accessToken,
        refreshToken
    }
}

async function saveToken(userId, refreshToken) {
    // Look for existing token associated with the user
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
        tokenData.refreshToken = refreshToken;

        return tokenData.save();
    }

    return await tokenModel.create({ user: userId, refreshToken });
}


module.exports = {
    generateTokens,
    saveToken
}