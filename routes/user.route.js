const router = require('express').Router();
//controllers
const {
    getUserList,
    makeAdmin,
    loginUser,
    registerUser,
    loginWithGoogle,
    updateAccount } = require("../controllers/User")
//middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");
const checkUser = require("../middlewares/checkUser");
const checkAdmin = require("../middlewares/checkAdmin");
/***
 * Protected routes=>only admin can access them
 */
router.get("/user-list", isAuthenticated, checkUser, checkAdmin, getUserList);
router.get("/make-admin/:id", isAuthenticated, checkUser, checkAdmin, makeAdmin);

/**
 * Protected routes=>only logged in user can access them
 */
router.put("/update-account", isAuthenticated, checkUser, updateAccount)
/**
 * Public routes
 */
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/login-with-google", loginWithGoogle)


module.exports = router
