const mongoose = require("mongoose");

const db = (url, user, pass, dbName) => {
    mongoose
        .connect(`${url}/${dbName}`, {
            user: user,
            pass: pass,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => {
            console.log("MongoDB connected!");
        })
        .catch((err) => console.error(err));
};

module.exports = db;
