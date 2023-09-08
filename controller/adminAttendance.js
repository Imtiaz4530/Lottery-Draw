const { addMinutes, isAfter } = require("date-fns");
const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error")

const getEnable = async (req, res) => {
    try {
        const running = await AdminAttendance.findOne({ status: 'RUNNING' });
        if (running) {
            throw error('Attendance already created!', 404)
        }
        const attendance = new AdminAttendance({ timeLimit: 4 });
        await attendance.save()
        return res.status(201).json({ message: "Success", attendance });
    } catch (e) {
        console.log(e);
    }
}

const getStatus = async (req, res) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Attendance not running!", 404);
    }
      
      const started = addMinutes(new Date(running.createdAt), running.timeLimit);
      if (isAfter(new Date(), started)) {
          running.status = 'COMPLETED'
          await running.save()
      }

    return res.status(200).json(running);
  } catch (e) {
    console.log(e);
  }
};

const getDisable = async (req, res) => {
      try {
        const running = await AdminAttendance.findOne({ status: "RUNNING" });
        if (!running) {
          throw error("Attendance not running!", 404);
        }

        running.status = "COMPLETED";
        await running.save();

        return res.status(200).json(running);
      } catch (e) {
        console.log(e);
      }
};

module.exports = {
  getEnable,
  getDisable,
  getStatus,
};