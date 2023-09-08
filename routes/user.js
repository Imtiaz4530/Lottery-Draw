const router = require("express").Router()

const { getUsers, getUserbyId, postUser, deleteUserbyId, patchUserById, PutUserbyId } = require("../controller/user")

//get user by id or email
router.get('/:userId', getUserbyId)

//update user by id
router.put('/:userId', PutUserbyId)

//update user by id
router.patch('/:userId', patchUserById)

//delete user by id
router.delete('/:userId', deleteUserbyId)

/**
 * Get all users, include
 *  - filter
 *  - sort
 *  - pagination
 *  - select properties
 * @route
*/
router.get('/', getUsers)

//create a new user
router.post('/', postUser)

module.exports = router