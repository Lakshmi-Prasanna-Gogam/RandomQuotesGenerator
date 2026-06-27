//npm i mongoose
const express = require('express');  //--> npm i express
let connection = require('./config/db.js')

// routes
let authRoutes = require('./routes/authRoute.js');
const savedQuotesRoute = require("./routes/savedQuotesRoute");
const analyticsRoute = require("./routes/analyticsRoute");

const app = express();
const port = process.env.PORT;

const path = require("path");
app.use(express.json());

app.use(express.static(__dirname));

app.use('/', authRoutes);
app.use("/", savedQuotesRoute);
app.use("/", analyticsRoute);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "LoginSignup.html"));
});

connection();

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})