const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
require("colors")
const connectDB = require("../Backend/config/config")

//dotenv config
dotenv.config({ path: "./config/config.env", });

//connect database
connectDB();

//rest object
const app = express();

//middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}
))
app.use(morgan("dev"))

//routes
app.use('/api/v1/items', require('./routes/itemRoutes.js'));
app.use('/api/v1/users', require('./routes/userRoute'));
app.use("/api/v1/bills", require("./routes/billsRoute"));

// port
const PORT = process.env.PORT || 3000;

//listen
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    console.log("visit url: http://127.0.0.1:4000")
})
