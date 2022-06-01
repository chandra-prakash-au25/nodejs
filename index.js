const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyparser = require("body-parser")


const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/order");


dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.get("/",(req,res)=>{
    res.send('hello from api part')
})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 8080, () => {
    console.log("Backend server is running!");
})