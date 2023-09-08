const { registerService, loginService } = require("../service/auth");

exports.registerController = async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({message: "Invalid Credentials..."})
    }

    try {    
        const user = await registerService({name, email, password})
        res.status(201).json({message: "User created successfully", user})
    } catch (e) {
        console.log(e);
    }
}

exports.loginController = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({message: "Invalid Credentials..."})
    }

    try {
        const token = await loginService({email, password})
        return res.status(200).json({message: "Login Successful...", token})
    } catch (e) {
        console.log(e);
    }
}
