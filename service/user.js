const User = require("../models/User")
const error = require("../utils/error")

const findUsers = () => {
    return User.find()
}

const findUserByProperty = (key, value) => {
    if (key === '_id') {
        return User.findById(value)
    }
    return User.findOne({[key]: value})
}

const createNewUser = ({name, email, password, roles, accountStatus}) => {
    const user = new User({
        name, 
        email, 
        password, 
        roles: roles ? roles: ['Student'], 
        accountStatus: accountStatus ? accountStatus : 'PENDING'
    })
    return user.save()
}

const updateUser = async (id, data) => {
    const user = await findUserByProperty('email', data.email)
    if (user) {
        throw error('User already exist!!!', 404)
    }

    return User.findByIdAndUpdate(id, {...data}, {new: true})
}

const deleteUser = (id) => {
    //Todo => That's not recomended.
    
    return User.findOneAndDelete(id)
}

module.exports = {
    findUserByProperty, createNewUser, findUsers, deleteUser, updateUser
}