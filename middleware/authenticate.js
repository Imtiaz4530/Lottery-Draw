const jwt = require("jsonwebtoken")

const User = require("../models/User")

async function authenticate(req, res, next) {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({message: "Unauthorized!!!"})
        }
        
        token = token.split(" ")[1]
        const decode = jwt.verify(token, 'secret-key')

        const user = await User.findById(decode._id)
        if (!user) {
            return res.status(400).json({message: "User doesn't exist!!!"})
        }

        req.user = user
        next()
    } catch (e) {
        console.log(e);
        return res.status(400).json({message: "Token verification filed!!!"})
    }
}

module.exports = authenticate