const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const db = require('../models')
const cors = require("cors");
const categoryRoute = require('./routes/category.route');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.get("/health", (req, res) => {
    res.send("OK!");
});


app.use('/api/v1',categoryRoute);
app.use('/api/v1',userRoute)
app.use('/api/v1',productRoute)



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
