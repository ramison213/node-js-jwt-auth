const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const { generateTokens } = require('./token-service');
const UserDto = require('../dtos/user-dto');
const tokenService = require('./token-service');
const ApiError = require('../errors/api-error');

async function registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
        throw ApiError.BadRequest(`Candidate with address ${email} already exists`);
    }

    const activationLink = uuid.v4();
    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await UserModel.create({ email, password: hashedPassword, activationLink });

    await mailService.sendActivationEmail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
        ...tokens,
        user: userDto
    }
}

async function activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
        throw ApiError.BadRequest(`Isn't correct activation link ${activationLink}`);
    }

    user.isActivated = true;
    await user.save();
}

module.exports = {
    registration,
    activate
}