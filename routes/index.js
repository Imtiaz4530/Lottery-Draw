const router = require("express").Router()

const authenticate = require("../middleware/authenticate")
const authRoute = require("./auth")
const userRoute = require("./user")
const adminAttendance = require("./adminAttendance")
const studentAttendance = require("./studentAttendance");

router.use('/auth', authRoute)
router.use('/users', authenticate, userRoute)
router.use("/admin/attendance", authenticate, adminAttendance);
router.use("/student/attendance", authenticate, studentAttendance);

module.exports = router