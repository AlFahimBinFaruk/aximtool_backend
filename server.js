const express = require("express");
const morgan = require("morgan")
const errorHandler = require("./middlewares/errorHandler")
const connectDB = require("./config/db")
const cors = require("cors")
require('dotenv').config();
//connect the database
connectDB();
//initialize app
const app = express();
app.use([cors(), express.json(), express.urlencoded({ extended: false }), morgan('dev')])

app.get('/', async (req, res, next) => {
  res.send("<h5>welcome to aximtools</h5>");
});

//user
app.use('/api/user', require('./routes/user.route'));
//review
app.use('/api/review', require('./routes/review.route'));
//tool
app.use('/api/tool', require('./routes/tool.route'));
//order
app.use('/api/order', require('./routes/order.route'));

//initialize error handler
app.use(errorHandler);

//lister the app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
