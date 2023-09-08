const {Schema, model} = require("mongoose")

const studentAttendanceSchema = new Schema({
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adminAttendance: {
    type: Schema.Types.ObjectId,
    ref: "AdminAttendance",
    required: true,
  },
});

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema)
module.exports = StudentAttendance