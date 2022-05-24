const { connect } = require("mongoose")

const connectDB = async () => {
    try {
        const con = await connect(process.env.MONGO_URI);
        console.log("MongoDB is conncented");
    } catch (error) {
        console.log("MongoDB error", error);
        process.exit(1);
    }
};

module.exports = connectDB;