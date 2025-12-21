let express = require("express");
const connectDB = require("./connectDB");
const router = require("./router");
let cookieparser = require("cookie-parser");
let app = express();
let cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();
app.use(express.json());
app.use(cookieparser());
app.use(router);
app.listen("8000", () => {
  console.log("server started");
});
