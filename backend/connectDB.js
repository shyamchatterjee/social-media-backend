let mongoose = require("mongoose");

let connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/social-media")
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
