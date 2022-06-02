const express = require("express");
const app = express();
const port = 8080;
const { dbConnection } = require("./config/config");
const { TypeError } = require("./middelwares/errors");

app.use(express.json())
dbConnection()

app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));


app.use(TypeError)

app.listen(port, console.log(`Server started on port ${port}`));