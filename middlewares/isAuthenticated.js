const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
//user model
const User = require("../models/User")
// see if the user has send the data needed to authorize him
const isAuthenticated = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            //verify
            const docoded = jwt.verify(token, process.env.JWT_SECRET);
            //get user creds from the token
            req.user = await User.findById(docoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized");
        }
    }
    //if token is not provided..
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized and no Token Given.");
    }
});


module.exports = isAuthenticated;