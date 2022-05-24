const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    ratings: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: false
    }


}, {
    timestamps: true
})

module.exports = mongoose.model("review", reviewSchema)
