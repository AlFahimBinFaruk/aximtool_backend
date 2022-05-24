const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    loginWithGoogle: {
        type: Boolean,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)
