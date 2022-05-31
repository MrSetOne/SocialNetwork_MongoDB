const express = require("express");
const app = express();
const port = 8080;
const { dbConnection } = require("./config/config")

app.use(express.json())
dbConnection()

app.use('/users', require('./routes/users'));


app.listen(port, console.log(`Server started on port ${port}`));