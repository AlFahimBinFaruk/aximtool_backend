const router = require('express').Router();
//controllers
const {
    getOrderList,
    getMyOrderList,
    addNewOrder,
    deleteOrder,
    shipOrder
} = require("../controllers/Order");
//stripe controller
const { handleCheckout, handleStripeWebhook } = require("../controllers/Stripe")
//middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");
const checkUser = require("../middlewares/checkUser");
const checkAdmin = require("../middlewares/checkAdmin");
/**
 * Protected routes => only admin can access them
 */
router.get("/admin-order-list", isAuthenticated, checkUser, checkAdmin, getOrderList);
router.get("/ship-order/:id", isAuthenticated, checkUser, checkAdmin, shipOrder)
/**
 * Logged in user and admin can access these
 */
router.delete("/delete-order/:id", isAuthenticated, checkUser, deleteOrder);
/**
 * Protected routes =>only logged in user can access them
 */
router.get("/my-order-list", isAuthenticated, checkUser, getMyOrderList);
router.post("/add-new-order", isAuthenticated, checkUser, addNewOrder);
router.post("/checkout", isAuthenticated, checkUser, handleCheckout)

/**
 * Public stripe webhook route
 */
router.post("/handle-stripe-webhook", handleStripeWebhook)

module.exports = router;
