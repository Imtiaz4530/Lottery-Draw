const router = require("express").Router()

const authenticate = require("../middleware/authenticate")
const {registerController, loginController} = require("../controller/auth")

router.post('/register', registerController)
router.post('/login', loginController)

module.exports = router