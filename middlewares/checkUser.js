//check if we have all the user creds
const checkUser = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }
    next();
};

module.exports = checkUser;