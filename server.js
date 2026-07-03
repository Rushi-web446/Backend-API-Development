require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const connectDB = require("./src/config/db");
const appRoutes = require("./src/routes/app.routs");


connectDB();

app.get("/test", (req, res) => {
    res.send("\n\nserver is jjjjjjjjjjjjjjjjjj running\n\n");
});



app.use("/", appRoutes);



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});