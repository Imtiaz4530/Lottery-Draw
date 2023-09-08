const User = require("../models/User");
const error = require("../utils/error")

const { findUsers, findUserByProperty, updateUser } = require("../service/user");
const { registerService } = require("../service/auth");

const getUsers = async (req, res) => {
    //Todo => filter, sort, pagination, select

    try {
        const users = await findUsers()
        return res.status(200).json(users)
    } catch (e) {
        console.log(e);
    }
}

const getUserbyId = async (req, res) => {
    const {userId} = req.params

    try {
        const user = await findUserByProperty('_id', userId)

        if (!user) {
            throw error("User dosen't exist!!!", 404)
        }

        return res.status(200).json(user)
    } catch (e) {
        console.log(e);
    }
}

const postUser = async (req, res) => {
    const {name, email, password, roles, accountStatus} = req.body

    try {
        const user = await registerService({name, email, password, roles, accountStatus})

        return res.status(200).json(user)
    } catch (e) {
        console.log(e);
    }
}

const PutUserbyId = async (req, res) => {
    const {userId} = req.params
    const {name, email, roles, accountStatus} = req.body

    try {
        const user = await updateUser(userId, {name, email, roles, accountStatus})
        
        if (!user) {
            throw error("User dosen't exist!!!", 404)
        }

        return res.status(200).json(user)
    } catch (e) {
        console.log(e);
    }
}

const patchUserById = async (req, res) => {
    const {userId} = req.params
    const {name, roles, accountStatus} = req.body

    try {
        const user = await findUserByProperty('_id', userId)

        if (!user) {
            throw error("User dosen't exist!!!", 404)
        }

        user.name = name ?? user.name
        user.roles = roles ?? user.roles
        user.accountStatus = accountStatus ?? user.accountStatus

        await user.save()
        return res.status(200).json(user)
    } catch (e) {
        console.log(e);
    }
}

const deleteUserbyId = async (req, res) => {
    const {userId} = req.params

    try {
        const user = await findUserByProperty('_id', userId)

        if (!user) {
            throw error("User dosen't exist!!!", 404)
        }

        await user.deleteOne()
        return res.status(203).send()

    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getUsers, getUserbyId, postUser, patchUserById, PutUserbyId, deleteUserbyId
}