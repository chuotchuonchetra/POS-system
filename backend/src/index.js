const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const db = require('../models')
const cors = require("cors");
const morgan = require("morgan")

const categoryRoute = require('./routes/category.route');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const paymentRoute = require('./routes/payment.route');
const orderRoute = require('./routes/order.route');


app.use(morgan("dev"));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());
app.get("/health", (req, res) => {
    res.send("OK!");
});


app.use('/api/v1/categories',categoryRoute);
app.use('/api/v1/auth',userRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/payments',paymentRoute)
app.use('/api/v1/orders',orderRoute)


const start = async ()=>{
    try {
        await db.sequelize.authenticate();
        console.log('Database connected.')
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}
start()
