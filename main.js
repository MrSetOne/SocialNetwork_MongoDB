const express = require("express");
const app = express();
require("dotenv").config();
const { PORT, FRONTEND_URL } = process.env;
const { dbConnection } = require("./config/config");
const { TypeError } = require("./middelwares/errors");
const cors = require('cors');


// const corsOptions = {
//   origin: FRONTEND_URL,
//   optionsSuccessStatus: 200,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }

// console.log(corsOptions);
app.use(cors());

app.use(express.json())
dbConnection()
// app.use(cors({origin: FRONTEND_URL, optionsSuccessStatus: 200}))

app.use(express.static("./assets"))

app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));


app.use(TypeError)

app.listen(PORT, console.log(`Server started on port ${PORT}`));