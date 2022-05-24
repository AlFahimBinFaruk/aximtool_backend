const asyncHandler = require("express-async-handler")
//order model
const Order = require("../models/Order");
//get all order list(admin)
const getOrderList = asyncHandler(async (req, res) => {
    const orderList = await Order.find()
    res.status(200).json(orderList);
});
//get my order list
const getMyOrderList = asyncHandler(async (req, res) => {
    const orderList = await Order.find({ userId: req.user.id })
    res.status(200).json(orderList);
})

//add new order
const addNewOrder = asyncHandler(async (req, res) => {
    const { productName, price, qty, address, phone } = req.body;
    if (!productName || !price || !qty || !address || !phone) {
        res.status(400);
        throw new Error("Please provide all info");
    }
    let subtotal = Number(price) * Number(qty);
    //add new order
    const order = await Order.create({
        userId: req.user.id,
        productName,
        price,
        qty,
        subtotal,
        paymentStatus: "unpaid",
        orderStatus: "pending",
        email: req.user.email,
        address,
        phone
    });

    if (order) {
        //send new order data
        res.status(200).json(order);
    } else {
        res.status(400);
        throw new Error("Some error occured");
    }


});


//delete order
const deleteOrder = asyncHandler(async (req, res) => {
    const id = req.params.id;
    //see if the order exits.
    const order = await Order.findById(id);
    if (!order) {
        res.status(400);
        throw new Error("please provide a valid order id");
    }
    if (order.paymentStatus == "unpaid") {
        await order.remove();
        // send the removed order id
        res.status(200).json({ id });
    }

    res.status(400);
    throw new Error("you cannot delete paid orders");

});

//ship order
const shipOrder = asyncHandler(async (req, res) => {
    const id = req.params.id;
    //see if the order exits.
    const order = await Order.findById(id);
    if (!order) {
        res.status(400);
        throw new Error("please provide a valid order id");
    }
    if (order.paymentStatus == "unpaid") {
        res.status(400);
        throw new Error("you cannot ship unpaid orders");
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus: "shipped" }, {
        new: true
    })
    res.status(200).json({ id, data: updatedOrder })

})

module.exports = {
    getOrderList,
    getMyOrderList,
    addNewOrder,
    deleteOrder,
    shipOrder
};