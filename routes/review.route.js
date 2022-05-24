const router = require('express').Router();
//controllers
const { getReviews, addReview } = require("../controllers/Review")
//middlwares
const isAuthenticated = require("../middlewares/isAuthenticated");
const checkUser = require("../middlewares/checkUser");
/**
 * Public routes
 * Get latest 6 review's
 */
router.get('/', getReviews);
/**
 * Protected routes
 */
router.post("/add-review", isAuthenticated, checkUser, addReview)

module.exports = router;
