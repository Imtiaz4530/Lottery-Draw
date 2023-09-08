const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const User = require('../models/User');
const { findUserByProperty, createNewUser } = require('./user');
const error = require("../utils/error")


const registerService = async ({name, email, password, roles, accountStatus}) => {
    let user = await findUserByProperty('email', email)
    if (user) {
        throw error('user already Exist!!!', 400)
    }

    const salt = bcrypt.genSaltSync(11);
    const hashPassword = await bcrypt.hash(password, salt)
    return createNewUser({name, email, password: hashPassword, roles, accountStatus})
}

const loginService = async ({email, password}) => {
    const user = await findUserByProperty('email', email)
    if (!user) {
        throw error(`User doesn't exist...`, 400)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw error(`Invalid Credentials...`, 400)
    }

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus
    }

    return jwt.sign(payload, 'secret-key', {expiresIn: '1d'})
    
}

module.exports = {
    registerService, loginService
}