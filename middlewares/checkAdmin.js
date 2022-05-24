//check if the user who is trying to access this route is an admin
const checkAdmin = (req, res, next) => {
    if (!req.user.isAdmin === true) {
        res.status(401);
        throw new Error("Only Admin Can Do This Task.");
    }
    next();
};

module.exports = checkAdmin;