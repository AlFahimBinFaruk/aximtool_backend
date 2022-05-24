const router = require('express').Router();
//controllers
const { getToolList, getToolDetails, addTool, deleteTool } = require("../controllers/Tool")
//middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");
const checkUser = require("../middlewares/checkUser");
const checkAdmin = require("../middlewares/checkAdmin");

/**
 * Public routes
 */
router.get("/tool-list", getToolList);

/**
 * Protected routes =>only logged in user can access them.
 */
router.get("/tool-details/:id", isAuthenticated, checkUser, getToolDetails);

/***
 * Protected routes =>only admin can access them
 */
router.post("/add-tool", isAuthenticated, checkUser, checkAdmin, addTool);
router.delete("/delete-tool/:id", isAuthenticated, checkUser, checkAdmin, deleteTool);

module.exports = router;
