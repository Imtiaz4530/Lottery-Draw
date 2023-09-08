const AdminAttendance = require("../models/AdminAttendance")
const StudentAttendance = require("../models/StudentAttendance");
const error = require("../utils/error")

const getAttendance = async (req, res) => {
    const { id } = req.params
    
    try {
        /**
         * Step 1 - Find admin attendance by id.
         * Step 2 - Check if it is running or not.
         * Step 3 - Register entry. 
         */
        
        const adminAttendance = await AdminAttendance.findById(id)
        if (!adminAttendance) {
            throw error("Invalid attendance ID", 404)
        }

        if (adminAttendance.status === 'COMPLETED') {
          throw error("Attendance already completed", 404);
        }

        let attendance = await StudentAttendance.findOne({
          user: req.user._id,
          adminAttendance: id,
        });
        if (attendance) {
          throw error("You are already attend", 404);
        }

        attendance = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id
        })

        await attendance.save()
        return res.status(201).json(attendance)

    } catch (e) {
        console.log(e);
    }
}

const getAttendanceStatus = async () => {
        try {
        } catch (e) {
          console.log(e);
        }
};

module.exports = {getAttendance, getAttendanceStatus}
