const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        require: true
    },
    qty: {
        type: String,
        require: true
    },
    subtotal: {
        type: String,
        require: true
    },
    paymentStatus: {
        type: String,
        require: true
    },
    orderStatus: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    tranId: {
        type: String,
        require: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("order", orderSchema)

