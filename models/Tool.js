const mongoose = require("mongoose");
const toolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        require: true
    },
    thumbURL: {
        type: String,
        require: true
    },
    minQty: {
        type: String,
        require: true
    },
    availQty: {
        type: String,
        require: true
    },
    shortDesc: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("tool", toolSchema)
