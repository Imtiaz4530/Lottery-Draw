const mongoose = require("mongoose");

function connectionDB(connectionSTR) {
    return mongoose.connect(connectionSTR)
}

module.exports = connectionDB

