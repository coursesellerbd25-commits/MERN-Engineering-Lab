const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

//Register Controller
const registerUser = async (req, res) => {
    try {
        const { name, email, password, } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields required",
            });
        }
        const existingUser = await User.findOne({ email, });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash( password, salt );
        const user = await User.create({ name, email, password: hashedPassword, });
        res.status(201).json({
            message: "User registered",
            token: 
                generateToken(
                    user._id
                ),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

//Login Controller
const loginUser = async ( req, res ) => {
    try {
        const { email, password, } = req.body;
        const user = await User.findOne({email,});
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                message: "Login Successful",
                token: 
                    generateToken(
                        user._id
                    ),
            });
        } else {
            res.status(401).json({
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

//Protected Dashboard Route
const dashboard = async (req, res) => {
    res.json({
        message: "Welcome to dashboard",
        user: req.user,
    });
};

//Export Controllers
module.exports = {registerUser, loginUser, dashboard,};