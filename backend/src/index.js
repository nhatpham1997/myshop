const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");

mongoose
    .connect(config.mongoose.url)
    .then(() => console.log("DBConnection Success!"))
    .catch((err) => {
        console.log(err);
    });

app.listen(config.port || 5000, () => {
    console.log(`Listening to port ${config.port}`);
});