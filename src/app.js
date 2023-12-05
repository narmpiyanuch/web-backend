require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoute = require("./routes/authRoute");
const homeRoute = require("./routes/homeRoute");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRoute);
app.use("/home", homeRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Running on PORT: ", PORT));
