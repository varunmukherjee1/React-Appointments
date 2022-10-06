require("dotenv").config();
const express = require("express");

require("./config/dbConfig");
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes")

const app = express();
app.use(express.json());
app.use("/api/user",userRoute);
app.use("/api/admin",adminRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT , (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log(`Listening to port ${PORT}`);
    }
})