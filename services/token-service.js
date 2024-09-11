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

async function removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });

    return tokenData;
}

async function findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });

    return tokenData;
}

function validateAccessToken(token) {
    try {
        const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        return tokenData;
    } catch (e) {
        return null;
    }
}

function validateRefreshToken(token) {
    try {
        const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        return tokenData;
    } catch (e) {
        return null;
    }
}




module.exports = {
    generateTokens,
    saveToken,
    removeToken,
    validateAccessToken,
    validateRefreshToken,
    findToken
}