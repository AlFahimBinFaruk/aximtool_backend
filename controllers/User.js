const asyncHandler = require("express-async-handler");
const { sign } = require("jsonwebtoken")
const { genSalt, hash, compare } = require("bcrypt")
//user model
const User = require('../models/User')

//get all user list
const getUserList = asyncHandler(async (req, res) => {
    let userlist = await User.find();
    res.status(200).json(userlist)
})
//register user
const registerUser = asyncHandler(async (req, res) => {
    let { username, email, password } = req.body;
    //see if user has provided all info
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please provide all info");
    }
    //see if user alrady exits
    const userExits = await User.findOne({ email });
    if (userExits) {
        res.status(400);
        throw new Error("User already exits");
    }
    //everything is ok then proceed
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    //create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        isAdmin: false
    });
    //if user is created successfully
    if (user) {
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genarateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Creds");
    }
});

//login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //if the user exits
    const user = await User.findOne({ email });
    //then if the password is correct
    if (user && (await compare(password, user.password))) {
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genarateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Creds");
    }
});

//login with google
const loginWithGoogle = asyncHandler(async (req, res) => {
    const { username, email } = req.body;
    //if the user exits we will send them the data or create a new one..Becoz this is login with google route so,the logic is different..
    //see if user has provided all info
    if (!username || !email) {
        res.status(400);
        throw new Error("Please provide all info");
    }
    //see if user alrady exits
    const userExits = await User.findOne({ email });
    if (userExits) {
        res.status(201).json({
            id: userExits.id,
            username: userExits.username,
            email: userExits.email,
            isAdmin: userExits.isAdmin,
            token: genarateToken(userExits.id),
        });
    } else {
        //if user dont exits create one..
        const user = await User.create({
            username,
            email,
            isAdmin: false,
            loginWithGoogle: true,
        });
        //if user is created successfully
        if (user) {
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: genarateToken(user.id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid Creds");
        }
    }
});

//update account
const updateAccount = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    res.status(200).json(updatedUser)
})

//make admin
const makeAdmin = asyncHandler(async (req, res) => {
    const id = req.params.id;
    //see if the user exits.
    const user = await User.findById(id);

    if (!user) {
        res.status(400);
        throw new Error("please provide a valid id");
    }

    const updatedUser = await User.findByIdAndUpdate(id, { isAdmin: true }, {
        new: true,
    });
    //send teh upated news data
    res.status(200).json({ id: id, data: updatedUser });
})

//genarate token
const genarateToken = (id) => {
    return sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    getUserList,
    makeAdmin,
    loginUser,
    registerUser,
    loginWithGoogle,
    updateAccount
};