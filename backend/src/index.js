const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./api/routes/user.route");
const authRoute = require("./api/routes/auth.route");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DBConnection Success!"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.POST || 5000, () => {
    console.log("Backend server is running!");
});