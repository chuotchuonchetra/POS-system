const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const db = require('../models')
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

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
