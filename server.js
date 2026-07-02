require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const connectDB = require("./src/config/db");


connectDB();

app.get("/", (req, res) => {
    res.send("\n\nserver is running\n\n");
});




app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});