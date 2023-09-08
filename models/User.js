const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name is too small!"],
        maxlength: [30, "Name is too big!"]
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: String,
    roles: {
        type: [String],
        required: true,
        default: ["Student"]
    },
    accountStatus: {
        type: String,
        required: true,
        enum: ["ACTIVE", "PENDING", " REJECTED"],
        default: "PENDING"
    }
})

const User = model("User", userSchema)
module.exports = User