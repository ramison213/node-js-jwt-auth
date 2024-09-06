const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const { generateTokens } = require('./token-service');
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");

async function registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
        throw new Error(`Candidate with address ${email} already exists`);
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

module.exports = {
    registration
}