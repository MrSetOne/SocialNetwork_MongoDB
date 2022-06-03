const express = require("express");
const app = express();
require("dotenv").config();
const { PORT } = process.env;
const { dbConnection } = require("./config/config");
const { TypeError } = require("./middelwares/errors");

app.use(express.json())
dbConnection()

app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));


app.use(TypeError)

app.listen(PORT, console.log(`Server started on port ${PORT}`));